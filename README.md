![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-web%20framework-black)
![SQLite](https://img.shields.io/badge/SQLite-database-lightgrey)
![Frontend](https://img.shields.io/badge/HTML%2FCSS%2FJS-frontend-orange)

CHECKMATE - Gestore Compiti Personale

---

## Descrizione del progetto

CheckMate è una semplice web app per la gestione di compiti personali.
L'utente può:
- Aggiungere nuovi compiti
- Salvare i dati in un database locale
- Visualizzare i compiti salvati,
- Modificare il titolo dei compiti
- Eliminare i compiti

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

- ** Backend: ** Python, Flask
- ** Database: ** SQLite (sqlite3)
- ** Frontend: ** HTML, CSS, JavaScript
- ** Tool di supporto: ** DB Browser for SQLite (solo fase iniziale)

---

## Installazione e avvio

### 1. Clona il repository
```bash
git clone https://github.com/jacopo-nesti/checkmate.git
cd checkmate

### 2. Crea ambiente virtuale
```bash
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

### 3. Installa le dipendenze
```bash
pip install -r requirements.txt

### 4. Avvia l’applicazione
```bash
python app.py

### 5. Nel browser
http://127.0.0.1:5000/

---

## Esempio di utilizzo

Avvia l'app
Aggiungi un nuovo compito
Visualizza la lista dei compiti
Modifica o elimina un compito

---

## Autori

- Jacopo Nesti
- Corso IFTS Software Developer - FISM FORMAZIONE

---

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi file `LICENSE` per i dettagli.

---

## Possibili sviluppi futuri

- Priorità dei compiti
- Stato completamento compiti (checkbox “fatto/non fatto”)
- Aggiungere un calendario interattivo
- Migliorare UI/UX
- Separazione HTML e CSS