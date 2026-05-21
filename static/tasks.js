// quando la pagina è pronta, carica le task
window.onload = loadTasks;

// LOAD TASKS
async function loadTasks() {
    const response = await fetch("/api/tasks"); // richiesta GET al backend
    const data = await response.json();  // converte risposta in JSON
    const taskList = document.getElementById("taskList");  // prende contenitore HTML

    taskList.innerHTML = "";  // Pulisce la lista prima di ridisegnarla (evito duplicati)

    // Ciclo sulle task ricevute dal backend
    data.tasks.forEach(task => {
        const li = document.createElement("li");  // crea elemento <li>
        li.textContent = task.title;  // testo task
        
        // QUI AGGIUNGO BOTTONE DELETE
        const deleteButton = document.createElement("button");  // creo bottone delete
        deleteButton.textContent = "Elimina";  // testo del bottone
        // stile semplice del bottone
        deleteButton.style.backgroundColor = "red";
        deleteButton.style.color = "white";
        deleteButton.style.border = "2px solid #000000";
        deleteButton.style.padding = "5px";
        deleteButton.style.borderRadius = "5px";
        deleteButton.style.cursor = "pointer";
        deleteButton.style.marginLeft = "12px";

        // quando clicco elimina parte la funzione deleteTask passando l'id specifico della task
        deleteButton.onclick = function() {
            deleteTasks(task.id);
        };

        // QUI AGGIUNGO BOTTONE EDIT TASKS
        const editButton = document.createElement("button");
        editButton.textContent = "Modifica";
        // stile semplice del bottone
        editButton.style.backgroundColor = "green";
        editButton.style.color = "black";
        editButton.style.border = "2px solid #000000";
        editButton.style.padding = "5px";
        editButton.style.borderRadius = "5px";
        editButton.style.cursor = "pointer";
        editButton.style.marginLeft = "12px";

        // quando clicco modifica parte la funzione editTask passando l'id specifico della task
        editButton.onclick = function() {
            const newText = prompt("Modifca la task:", task.title);
            if (newText && newText.trim() !== "") {
                updateTask(task.id, newText);
            }
        };


        li.appendChild(editButton);  // aggiunge bottone edit dentro <li>
        li.appendChild(deleteButton);  // aggiunge bottone delete dentro <li>
        taskList.appendChild(li);  // aggiunge <li> alla lista
    });
}

// CREATE TASK
async function addTask() {

    // prende input HTML
    const input = document.getElementById("taskInput");

    // prende testo scritto
    const title = input.value;
    
    // manda richiesta POST al backend
    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title
        })
    });

    // svuota input dopo invio
    input.value = "";
    alert("Task aggiunta con successo!");
}

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