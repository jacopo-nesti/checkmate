# Installazione e avvio

## 1. Clona il repository
```bash
git clone https://github.com/jacopo-nesti/checkmate.git
cd checkmate
```

## 2. Crea ambiente virtuale
```bash
python -m venv venv
```
Attivalo:

- Windows
```bash
venv\Scripts\activate
```
- Mac/Linux
```bash
source venv/bin/activate
```

## 3. Installa le dipendenze
```bash
pip install -r requirements.txt
```

## 4. Avvia l’applicazione
```bash
python app.py
```

## 5. Nel browser
Apri il browser e visita:  

👉 http://127.0.0.1:5000/

## Nota

Il database SQLite viene creato automaticamente al primo avvio dell'applicazione.