// QUI AGGIUNGO BOTTONE DELETE
export function createDeleteButton(task, reloadTasks) {
    const deleteButton = document.createElement("button"); // creo bottone delete
    deleteButton.textContent = "Elimina"; // testo del bottone
    deleteButton.classList.add("delete-btn");

    // quando clicco elimina parte la richiesta DELETE passando l'id specifico della task
    deleteButton.onclick = async () => {
        const res = await fetch(`/api/tasks/${task.id}`, { method: "DELETE" }); // ${id} inserisco variabile nella stringa

        if (!res.ok) {
            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }
            const err = await res.json().catch(() => ({}));
            alert(err.error || "Errore eliminazione.");
            return;
        }

        reloadTasks(); // ricarica lista DB aggiornata
    };

    return deleteButton;
}

// QUI AGGIUNGO BOTTONE EDIT TASKS
export function createEditButton(task, reloadTasks) {
    const editButton = document.createElement("button");
    editButton.textContent = "Modifica";
    editButton.classList.add("edit-btn");

    // quando clicco modifica parte la richiesta PUT passando l'id specifico della task
    editButton.onclick = async () => {
        const newText = prompt("Modifica la task:", task.title);
        if (!newText || newText.trim() === "") return;

        const res = await fetch(`/api/tasks/${task.id}`, { // ${id} inserisco variabile nella stringa
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: newText.trim() }),
        });

        if (!res.ok) {
            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }
            const err = await res.json().catch(() => ({}));
            alert(err.error || "Errore modifica.");
            return;
        }

        reloadTasks(); // ricarica lista DB aggiornata
    };

    return editButton;
}

// BOTTONE PRIORITY E MENU A TENDINA
export function createPriorityButton(task) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("priority-wrapper");

    const btn = document.createElement("button");
    btn.textContent = "Priorità";
    btn.classList.add("priority-btn");

    const menu = document.createElement("div");
    menu.classList.add("priority-menu", "hidden");

    const priorities = [
        "Importante",
        "Da fare",
        "Chill bro...hai tutto il tempo",
    ];

    priorities.forEach(p => {
        const item = document.createElement("div");
        item.textContent = p;
        item.classList.add("priority-item");

        item.onclick = () => {
            btn.textContent = p;
            menu.classList.add("hidden");
        };

        menu.appendChild(item);
    });

    btn.onclick = () => {
        menu.classList.toggle("hidden");
    };

    wrapper.appendChild(btn);
    wrapper.appendChild(menu);

    return wrapper;
}
