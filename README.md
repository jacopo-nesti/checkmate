# CHECKMATE - Gestore Compiti Personale

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Node.js](https://img.shields.io/badge/Node.js-runtime-green)
![Docker](https://img.shields.io/badge/Docker-container-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-database-green)
![React](https://img.shields.io/badge/React-library-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-framework-009688)
![Git](https://img.shields.io/badge/Git-version--control-orange)
![GitHub](https://img.shields.io/badge/GitHub-platform-black)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![Build](https://img.shields.io/badge/build-passing-success)
![Linux](https://img.shields.io/badge/Linux-OS-FCC624)
![Windows](https://img.shields.io/badge/Windows-OS-0078D6)
![MacOS](https://img.shields.io/badge/macOS-Apple-999999)
![API](https://img.shields.io/badge/API-REST-red)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Contributions](https://img.shields.io/badge/contributions-welcome-orange)

---

## Descrizione del progetto

CheckMate è una semplice web app per la gestione di compiti personali.  
L'utente può:

- ✅ Aggiungere nuovi compiti
- ✅ Salvare i dati in un database locale
- ✅ Visualizzare i compiti salvati,
- ✅ Modificare il titolo dei compiti
- ✅ Eliminare i compiti

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
│   └── tasks.html
│
├── static/
│   ├── style.css
│   ├── script.js
│   ├── tasks.js
│   └── buttons.js
│
├── database/
    └── tasks.db
```

---

## Obiettivo del progetto

Il progetto è stato sviluppato a scopo didattico/formativo per il corso   
** IFTS Software Developer (FISM FORMAZIONE) **  
L'obiettivo è comprendere le relazione tra:
- Database
- Backend
- Frontend

attraverso la realizzazione di una web app completa.

---

## Tecnologie utilizzate

- Backend: *Python, Flask*
- Database: *SQLite (sqlite3)*
- Frontend: *HTML, CSS, JavaScript*
- Tool di supporto: *DB Browser for SQLite (solo fase iniziale)*

---

## Installazione e avvio

Leggi la [guida per l'installazione](/INSTALLAZIONE.md) per i dettagli.

---

## Esempio di utilizzo

- Avvia l'app  
- Aggiungi un nuovo compito  
- Visualizza la lista dei compiti  
- Modifica o elimina un compito

---

## Autori

- Jacopo Nesti
- Corso IFTS Software Developer - FISM FORMAZIONE

---

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi file [LICENSE](/LICENSE.md) per i dettagli.

---

##  Aggiornamenti futuri

- [x] Migliorata UI/UX in chiave moderna  
- [x] Separazione tra file HTML e CSS  
- [x] Aggiunta data nella homepage  
- [ ] Implementazione priorità dei compiti  
- [ ] Ordinamento delle task in base alla priorità  
- [ ] Unificazione di homepage e lista compiti in un’unica pagina  
- [ ] Stato completamento compiti (checkbox “fatto/non fatto”)  
- [ ] Aggiungere un calendario interattivo  
- [ ] Drag & drop per riordinare task  
- [ ] Tag o categorie (studio, lavoro, personale)  

---
