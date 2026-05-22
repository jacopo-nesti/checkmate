// DATA DI OGGI

document.getElementById("data").innerHTML =
  new Date().toLocaleDateString("it-IT");


// AFORISMA CASUALE

const aforismi = [
  "La procrastinazione è l’arte di tenere il passo con ieri.",
  "Non rimandare a domani ciò che il tuo futuro ti sta già rimproverando oggi.",
  "Il tempo non aspetta chi lo spreca aspettando il momento giusto.",
  "La procrastinazione è un debito che si paga con stress.",
  "Ogni minuto rimandato diventa un’ora di pressione futura.",
  "Non è mancanza di tempo, è mancanza di priorità.",
  "Domani è il luogo preferito dei sogni mai realizzati.",
  "Chi rimanda oggi, rincorre sempre domani.",
  "La motivazione arriva dopo l’inizio, non prima.",
  "La procrastinazione trasforma piccoli compiti in grandi problemi.",
  "Il segreto per iniziare è smettere di aspettare di essere pronti.",
  "Rimandare è facile, ma recuperare costa il doppio.",
  "Il futuro ringrazia chi agisce nel presente.",
  "Non aspettare il momento perfetto: il momento perfetto non arriva.",
  "Ogni compito evitato torna più pesante."
];

function nuovoAforisma() {
  const index = Math.floor(Math.random() * aforismi.length);
  document.getElementById("aforisma").textContent = aforismi[index];
}