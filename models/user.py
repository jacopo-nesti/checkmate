from flask_login import UserMixin

# modello utente per Flask-Login (collegato alla tabella users nel DB)
class User(UserMixin):
    def __init__(self, id, username, password_hash):
        self.id = id
        self.username = username
        self.password_hash = password_hash

    # Flask-Login si aspetta id come stringa
    def get_id(self):
        return str(self.id)
