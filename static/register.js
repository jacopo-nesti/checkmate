// prende input dal form e chiama API Flask

const form = document.getElementById("register-form");

if (!form) {
    console.error("Form register non trovato");
} else {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Inserisci username e password.");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                alert("Registrazione completata!");
                window.location.href = "/login";
            } else {
                alert(data.error || "Registrazione non riuscita.");
            }
        } catch {
            alert("Errore di rete. Riprova.");
        }
    });
}