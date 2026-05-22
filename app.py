from flask import Flask, request, render_template
import sqlite3
import os

app = Flask(__name__)

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
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        completed INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()

# Crea cartella e tabella anche con "flask run" (non solo python app.py)
init_db()

# HOME
@app.route("/")
def landing():
    return render_template("index.html")

@app.route("/tasks")
def tasks_page():
    return render_template("tasks.html")

# CREATE TASKS    
@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    title = data["title"]
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tasks (title, completed) VALUES (?,?)",
        (title, 0)
    )
    conn.commit()
    conn.close()
    return {"message": "Task creato con successo!"}

# GET TASKS
@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    conn.close()
    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "title": row[1],
            "completed": row[2],
            "created_at": row[3]
        })
    return {"tasks": tasks}

# UPDATE TASKS
@app.route("/api/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    data = request.get_json()
    title = data.get("title")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE tasks SET title = ? WHERE id = ?",
        (data["title"], id)
    )
    conn.commit()
    conn.close()
    return {"message": "Task aggiornata con successo"}

# DELETE TASK
@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn=sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM tasks WHERE id = ?",
        (id,)
    )
    conn.commit()
    conn.close()
    return {"message": "Task eliminata con successo"}

# START SERVER
if __name__ == "__main__":
    init_db()
    app.run(debug=True)