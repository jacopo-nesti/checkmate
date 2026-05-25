# CHECKMATE - Gestore Compiti Personale

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-web%20framework-black)
![SQLite](https://img.shields.io/badge/SQLite-database-lightgrey)
![HTML](https://img.shields.io/badge/HTML-CSS-orange)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

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

## Struttura

checkmate/
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

-[x] Migliorata UI/UX in chiave moderna
-[x] Separazione tra file HTML e CSS
-[x] Aggiunta data nella homepage
-[] Implementazione priorità dei compiti
-[] Ordinamento delle task in base alla priorità
-[] Unificazione di homepage e lista compiti in un’unica pagina
-[] Stato completamento compiti (checkbox “fatto/non fatto”)
-[] Aggiungere un calendario interattivo
-[] Drag & drop per riordinare task
-[] Tag o categorie (studio, lavoro, personale)

---