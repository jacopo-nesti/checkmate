// DATA DI OGGI

document.querySelector(".data").textContent =
  new Date().toLocaleDateString("it-IT");


// AFORISMA CASUALE

const aforismi = [
  "La motivazione arriva sempre… cinque minuti dopo aver iniziato.",
  "Non è mancanza di tempo, è eccesso di distrazioni ben organizzate.",
  "Ogni compito iniziato è un problema già a metà risolto.",
  "Il futuro ringrazia sempre chi non ha rimandato ieri.",
  "La disciplina è solo motivazione che non ha preso ferie.",
  "Iniziare è la parte difficile, continuare è solo onestà.",
  "Le scuse non finiscono mai, ma i compiti sì.",
  "Il lavoro fatto oggi è il riposo comprato per domani.",
  "Aspettare il momento giusto è il modo più elegante per non iniziare mai.",
  "La versione migliore di te non si apre da sola: va avviata.",
  "Non serve fare tutto perfetto, serve farlo iniziare.",
  "La produttività è semplicemente la procrastinazione delle distrazioni.",
  "Ogni piccolo passo è un colpo dato alla versione pigra di te.",
  "Se fosse facile, non sarebbe utile.",
  "Non hai bisogno di più tempo, hai bisogno di meno scuse."
];

function nuovoAforisma() {
  const index = Math.floor(Math.random() * aforismi.length);
  document.querySelector(".aforisma").textContent = aforismi[index];
}

// Se `script.js` viene caricato come module, l'HTML non vede le funzioni
// chiamate via onclick="...". Esponiamo quella usata dalla pagina.
window.nuovoAforisma = nuovoAforisma;