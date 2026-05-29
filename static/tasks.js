import { createDeleteButton, createEditButton, createPriorityButton } from "./buttons.js";

// quando la pagina è pronta, carica le task
window.onload = loadTasks;

// LOAD TASKS
async function loadTasks() {
    const taskList = document.getElementById("taskList");

    if (!taskList) return;

    const response = await fetch("/api/tasks"); // richiesta GET al backend

    if (!response.ok) {
        if (response.status === 401) {
            window.location.href = "/login";
            return;
        }
        alert("Errore nel caricamento dei compiti.");
        return;
    }

    const data = await response.json(); // converte risposta in JSON
    taskList.innerHTML = ""; // pulisce la lista prima di ridisegnarla (evito duplicati)

    // ciclo sulle task ricevute dal backend
    data.tasks.forEach(task => {
        const li = document.createElement("li"); // crea elemento <li>
        li.textContent = task.title; // testo task
        // container bottoni
        const actions = document.createElement("div");
        actions.classList.add("actions");
        actions.appendChild(createPriorityButton(task));
        actions.appendChild(createEditButton(task, loadTasks));
        actions.appendChild(createDeleteButton(task, loadTasks));
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// CREATE TASK
async function addTask() {
    // prende input HTML
    const input = document.getElementById("taskInput");
    // prende testo scritto
    const title = input.value.trim();
    if (!title) {
        alert("Inserisci un titolo per il tuo compito!");
        return;
    }

    try {
        // manda richiesta POST al backend
        const res = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                title: title,
            }),
        });

        if (!res.ok) {
            if (res.status === 401) {
                window.location.href = "/login";
                return;
            }

            const err = await res.json().catch(() => ({}));
            alert(err.error || "Errore creazione task.");
            return;
        }

        input.value = "";
        showTaskFeedback("Task aggiunta con successo!");
        const taskList = document.getElementById("taskList");
        if (taskList) await loadTasks();
    } catch {
        alert("Errore di rete. Riprova.");
    }
}

function showTaskFeedback(message) {
    const el = document.getElementById("taskFeedback");

    if (!el) {
        alert(message);
        return;
    }

    el.textContent = message;
    el.hidden = false;
    clearTimeout(el._hideTimer);
    el._hideTimer = setTimeout(() => {
        el.hidden = true;
        el.textContent = "";
    }, 4000);
}

// se `tasks.js` è caricato come module, l'HTML non vede le funzioni
// chiamate via onclick="...". esponiamo quella usata dalla pagina.
window.addTask = addTask;