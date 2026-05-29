from flask import Flask, request, jsonify, render_template, redirect
import sqlite3
import os
from models.user import User
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-only-change-me")

login_manager = LoginManager()  # gestisce login/logout/sessioni
login_manager.init_app(app)  # collego a Flask app
login_manager.login_view = "login"  # se non loggato è dove ti manda


# Se chiami un'API senza essere loggato → JSON 401 (non redirect HTML)
@login_manager.unauthorized_handler
def unauthorized():
    if request.path.startswith("/api/"):
        return jsonify({"error": "Autenticazione richiesta"}), 401
    return redirect("/login")

# Crea il percorso relativo alla cartella del progetto
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "database")
db_path = os.path.join(DB_DIR, "tasks.db")


def init_db():
    # Crea la cartella database se non esiste
    os.makedirs(DB_DIR, exist_ok=True)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    """)

    conn.commit()
    conn.close()

# Crea cartella e tabella anche con "flask run" (non solo python app.py)
init_db()

# ROUTE
@app.route("/")
def landing():
    return render_template("first.html")

@app.route("/index")
@login_required
def home_page():
    return render_template("index.html")

@app.route("/tasks")
@login_required
def tasks_page():
    return render_template("tasks.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/register")
def register_page():
    return render_template("register.html")

@app.route("/logout")
@login_required
def logout_page():
    logout_user()
    return redirect("/")

# FUNZIONE LOGIN: quando hai un utente loggato, per ritrovarlo nel DB usa questa funzione
@login_manager.user_loader
def load_user(user_id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        return User(row[0], row[1], row[2])

    return None


# REGISTER
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json(silent=True) or {}  # ricevo dati dal frontend

    username = (data.get("username") or "").strip()  # separazione input
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "Username e password obbligatori"}), 400

    password_hash = generate_password_hash(password)  # non salvo le password ma le trasformo in hash

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute(
            "INSERT INTO users (username, password_hash) VALUES (?, ?)",  # salvo nel DB
            (username, password_hash),
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({"error": "username inserito già esistente. Prova con un altro!"}), 400

    conn.close()

    return jsonify({"message": "Utente registrato con successo!"})


# LOGIN
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}

    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if not username or not password:
        return jsonify({"error": "Username e password obbligatori"}), 400

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))  # cerco utente
    row = cursor.fetchone()
    conn.close()

    if not row:
        return jsonify({"error": "Utente non trovato"}), 404

    user = User(row[0], row[1], row[2])  # cerco oggetto User

    if not check_password_hash(user.password_hash, password):  # controllo password
        return jsonify({"error": "Password errata"}), 401

    login_user(user)  # login sessione

    return jsonify({"message": "Login effettuato con successo"})

# LOGOUT
@app.route("/api/logout", methods=["POST"])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logout effettuato. A presto!"})

# TEST UTENTE LOGGATO
@app.route("/api/me", methods=["POST"])
@login_required
def me():
    return jsonify({
        "id": current_user.id,
        "username": current_user.username,
    })

# CREATE TASKS
@app.route("/api/tasks", methods=["POST"])
@login_required
def create_task():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()

    if not title:
        return jsonify({"error": "Titolo obbligatorio"}), 400

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO tasks (title, completed, user_id) VALUES (?, ?, ?)",
        (title, 0, current_user.id),
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Task creato con successo!"})

# GET TASKS
@app.route("/api/tasks", methods=["GET"])
@login_required
def get_tasks():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM tasks WHERE user_id = ?",
        (current_user.id,),
    )

    rows = cursor.fetchall()
    conn.close()

    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "title": row[1],
            "completed": row[2],
            "created_at": row[3],
            "user_id": row[4],
        })

    return jsonify({"tasks": tasks})

# UPDATE TASKS
@app.route("/api/tasks/<int:id>", methods=["PUT"])
@login_required
def update_task(id):
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()

    if not title:
        return jsonify({"error": "Titolo obbligatorio"}), 400

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        "UPDATE tasks SET title = ? WHERE id = ? AND user_id = ?",
        (title, id, current_user.id),
    )

    conn.commit()
    conn.close()

    return jsonify({"message": "Task aggiornata con successo"})

# DELETE TASK
@app.route("/api/tasks/<int:id>", methods=["DELETE"])
@login_required
def delete_task(id):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        (id, current_user.id),
    )

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({"error": "Task non trovata"}), 404

    conn.close()

    return jsonify({"message": "Task eliminata con successo"})

# START SERVER
if __name__ == "__main__":
    init_db()
    app.run(debug=True)