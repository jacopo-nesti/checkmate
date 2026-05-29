# CHECKMATE - Gestore Compiti Personale

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-web%20framework-black)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success)

---  AGGIUNGI SCREENSHOT

## Descrizione del progetto

CheckMate è una web app Flask per gestire compiti personali. Ogni utente ha il proprio account e vede solo le proprie task, salvate in SQLite.  
L'utente può:

- ✅ Aggiungere nuovi compiti
- ✅ Salvare i dati in un database locale
- ✅ Visualizzare i compiti salvati
- ✅ Modificare il titolo dei compiti
- ✅ Priorità task (solo UI, non persistita)
- ✅ Eliminare i compiti
- ✅ Registrazione nuovo utente, login e logout
- ✅ Dashboard personale dopo il login

---

## Struttura del progetto

```text
checkmate/
│
├── README.md
├── INSTALLAZIONE.md
├── requirements.txt
├── .gitignore
├── LICENSE.md
├── app.py
│
├── templates/
│   ├── index.html
│   ├── first.html
│   ├── login.html
│   ├── register.html
│   └── tasks.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── tasks.js
│   ├── login.js
│   ├── register.js
│   └── buttons.js
│
├── models/
│   ├── user.py  # modello Flask-Login
│
├── database/
    └── tasks.db  # creato al primo avvio (non versionato)
```

---

## Obiettivo del progetto

Il progetto è stato sviluppato a scopo didattico/formativo per il corso   
**IFTS Software Developer (FISM FORMAZIONE)**  
L'obiettivo è comprendere le relazioni tra:
- Database
- Backend
- Frontend

attraverso la realizzazione di una web app completa.

---

## Tecnologie utilizzate

| Layer     | Stack                                                      |
|-----------|------------------------------------------------------------|
| Backend   | Python 3.10+, Flask 3, Flask-Login                         |
| Database  | SQLite (`sqlite3`)                                         |
| Frontend  | HTML, CSS, JavaScript                                      |
| Sicurezza | Werkzeug (`generate_password_hash`, `check_password_hash`) |

---

## Installazione e avvio

Leggi la [guida per l'installazione](/INSTALLAZIONE.md) per i dettagli.

---

## Route principali

| Route                         | Descrizione                    | Auth |
|-------------------------------|--------------------------------|------|
| `/`                           | Landing page                   | No   |
| `/login`, `/register`         | Autenticazione                 | No   |
| `/index`                      | Home utente, aggiunta task     | Sì   |
| `/tasks`                      | Lista compiti                  | Sì   |
| `/logout`                     | Logout                         | Sì   |
| `/api/register`, `/api/login` | API auth                       | No   |
| `/api/tasks`                  | GET/POST compiti               | Sì   |
| `/api/tasks/<id>`             | PUT/DELETE compito             | Sì   |

---

## Esempio di utilizzo

1. Apri http://127.0.0.1:5000/
2. Clicca Registrati e crea un account
3. Effettua il Login
4. Dalla home aggiungi un compito
5. Vai su Visualizza i tuoi compiti per modificarlo o eliminarlo
6. Logout quando hai finito

---

## Autori

- Jacopo Nesti

---

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi file [LICENSE](/LICENSE.md) per i dettagli.

---

## Aggiornamenti futuri

### ✅ Attuale
- [x] CRUD tasks
- [x] SQLite + schema utenti/task
- [x] Registrazione, login, logout
- [x] UI moderna (CSS separato, layout responsive base)
- [x] Protezione route con `login_required`
---
### 🔐 In sviluppo
- [ ] Persistenza priorità nel database (oggi solo UI lato client)
- [ ] Segna compito come completato (completed esiste già nel DB)
- [ ] Validazione password (lunghezza minima)
- [ ] Documentare SECRET_KEY / setup produzione
---
### 🧠 Futuro
- [ ] Ordinamento task per priorità
- [ ] Calendario interattivo
- [ ] Drag & drop per riordinare task
- [ ] Tag o categorie (studio, lavoro, personale)
- [ ] UI/UX completamente rinnovata (frontend moderno)
- [ ] Test automatici

---

## Limitazioni note

- Le priorità sono solo visive: non vengono salvate nel database.
- Il campo completato esiste nel DB ma non è ancora usato nell’interfaccia.
- L’app è pensata per sviluppo locale, non per deploy in produzione senza ulteriori configurazioni di sicurezza.