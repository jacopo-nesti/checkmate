import { createDeleteButton, createEditButton, createPriorityButton } from "./buttons.js";

// quando la pagina è pronta, carica le task
window.onload = loadTasks;

// LOAD TASKS
async function loadTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return;

    const response = await fetch("/api/tasks"); // richiesta GET al backend
    const data = await response.json();  // converte risposta in JSON
    taskList.innerHTML = "";  // Pulisce la lista prima di ridisegnarla (evito duplicati)

    // Ciclo sulle task ricevute dal backend
    data.tasks.forEach(task => {
        const li = document.createElement("li");  // crea elemento <li>
        li.textContent = task.title;  // testo task
        
        // Container bottoni
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
    
    // manda richiesta POST al backend
    const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    if (!res.ok) {
        let details = "";
        try {
            details = await res.text();
        } catch {
            // ignore
        }
        throw new Error(`Errore creazione task (${res.status}). ${details}`);
    }

    input.value = "";
    showTaskFeedback("Task aggiunta con successo!");

    const taskList = document.getElementById("taskList");
    if (taskList) await loadTasks();
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

// `tasks.js` è caricato come <script type="module">: per usarla da onclick=""
// dobbiamo esporla sul global `window`.
window.addTask = addTask;

// DELETE TASK
async function deleteTasks(id) {

    // richiesta DELETE al backend (es. DELETE /api/tasks/3)
    await fetch(`/api/tasks/${id}`, {  // ${id} vado a inserire una variabile dentro una stringa
        method: "DELETE"
    });

    loadTasks();  // ricarica lista DB aggiornata
}

// MODIFICA TASK
async function updateTask(id, newTitle) {

    await fetch(`/api/tasks/${id}`, {  // ${id} vado a inserire una variabile dentro una stringa
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newTitle })
    });

    loadTasks();
}