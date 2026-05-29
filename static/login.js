// prende input dal form e chiama API Flask

const form = document.getElementById("login-form");

if (!form) {
    console.error("Form login non trovato");
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
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                alert("Login effettuato con successo!");

                window.location.href = "/index"; // redirect to index
            } else {
                alert(data.error || "Login non riuscito.");
            }
        } catch {
            alert("Errore di rete. Riprova.");
        }
    });
}
