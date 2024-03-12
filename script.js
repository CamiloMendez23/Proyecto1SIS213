document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add');
    const searchInput = document.getElementById('search');
    const taskContainer = document.getElementById('tasks');

    addButton.addEventListener('click', function() {
        const title = prompt("Ingrese el titulo:");
        const description = prompt("Ingrese la descripcion:");
        const date = prompt("Ingrese la fecha:");

        if (title !== null && description !== null && date !== null) {
            const taskElement = document.createElement('div');

            taskElement.innerHTML = `
                <div class="task">
                    <button class="complete">Tarea Completada</button>
                    <div class="task-content">
                        <!-- Aquí va el cuadro de tarea -->
                        <strong>${title}</strong><br>
                        ${description}<br>
                        ${date}
                    </div>
                    <div class="task-buttons">
                        <button class="edit">✏️Editar</button>
                        <button class="delete">🗑️Borrar</button>
                    </div>
                </div>
            `;

            // Complete Task
            taskElement.querySelector('.complete').addEventListener('click', function() {
                const taskText = this.nextElementSibling;
                if (taskText.style.textDecoration === 'line-through') {
                    taskText.style.textDecoration = 'none'; // Revertir
                } else {
                    taskText.style.textDecoration = 'line-through';
                }
            });

            // Edit Task
            taskElement.querySelector('.edit').addEventListener('click', function() {
                const taskContent = this.parentElement.previousElementSibling;
                const editedTitle = prompt("Edit title:", taskContent.querySelector('strong').innerHTML);
                const editedDescription = prompt("Edit description:", taskContent.children[1].innerHTML);
                const editedDate = prompt("Edit date:", taskContent.children[2].innerHTML);

                if (editedTitle !== null && editedDescription !== null && editedDate !== null) {
                    taskContent.innerHTML = `
                        <strong>${editedTitle}</strong><br>
                        ${editedDescription}<br>
                        ${editedDate}
                    `;
                }
            });

            // Delete Task
            taskElement.querySelector('.delete').addEventListener('click', function() {
                if (confirm("Do you want to delete this task?")) {
                    this.parentElement.parentElement.remove();
                }
            });

            // Append New Task to Container
            taskContainer.appendChild(taskElement);
        }
    });

    // Search Tasks
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const tasks = document.querySelectorAll('.task');

        tasks.forEach(function(task) {
            const taskContent = task.querySelector('.task-content').textContent.toLowerCase();
            task.style.display = taskContent.includes(searchText) ? 'flex' : 'none';
        });
    });
});

