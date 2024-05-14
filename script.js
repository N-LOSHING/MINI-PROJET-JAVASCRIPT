document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskFormElement = document.getElementById('taskFormElement');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const taskList = document.getElementById('taskList');
    const formTitle = document.getElementById('formTitle');
    const taskDetail = document.getElementById('taskDetail');
    const closeDetailBtn = document.getElementById('closeDetailBtn');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let editIndex = null;

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <strong>Date:</strong> ${task.date} <br>
                <strong>Description:</strong> ${task.description} <br>
                <strong>Difficulté:</strong> ${task.difficulty} <br>
                <strong>Terminée:</strong> ${task.completed ? 'Oui' : 'Non'} <br>
            `;
            taskItem.addEventListener('click', () => viewTask(index));
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.addEventListener('click', (e) => {
                e.stopPropagation();
                editTask(index);
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    }

    function saveTask(event) {
        event.preventDefault();
        const task = {
            date: document.getElementById('taskDate').value,
            time: document.getElementById('taskTime').value,
            description: document.getElementById('taskDescription').value,
            skills: document.getElementById('taskSkills').value,
            comment: document.getElementById('taskComment').value,
            rating: document.getElementById('taskRating').value,
            difficulty: document.getElementById('taskDifficulty').value,
            completed: document.getElementById('taskCompleted').checked,
        };

        if (editIndex === null) {
            tasks.push(task);
        } else {
            tasks[editIndex] = task;
            editIndex = null;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskFormElement.reset();
        taskForm.classList.add('hidden');
        renderTasks();
    }

    function editTask(index) {
        const task = tasks[index];
        document.getElementById('taskDate').value = task.date;
        document.getElementById('taskTime').value = task.time;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskSkills').value = task.skills;
        document.getElementById('taskComment').value = task.comment;
        document.getElementById('taskRating').value = task.rating;
        document.getElementById('taskDifficulty').value = task.difficulty;
        document.getElementById('taskCompleted').checked = task.completed;

        formTitle.textContent = 'Modifier la tâche';
        taskForm.classList.remove('hidden');
        editIndex = index;
    }

    function deleteTask(index) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }

    function viewTask(index) {
        const task = tasks[index];
        document.getElementById('detailDate').textContent = task.date;
        document.getElementById('detailDescription').textContent = task.description;
        document.getElementById('detailTime').textContent = task.time;
        document.getElementById('detailSkills').textContent = task.skills;
        document.getElementById('detailComment').textContent = task.comment;
        document.getElementById('detailRating').textContent = task.rating;
        document.getElementById('detailDifficulty').textContent = task.difficulty;
        document.getElementById('detailCompleted').textContent = task.completed ? 'Oui' : 'Non';
        taskDetail.classList.remove('hidden');
    }
    addTaskBtn.addEventListener('click', () => {
        taskFormElement.reset();
        formTitle.textContent = 'Ajouter une nouvelle tâche';
        taskForm.classList.remove('hidden');
    });
    cancelBtn.addEventListener('click', () => {
        taskFormElement.reset();
        taskForm.classList.add('hidden');
        editIndex = null;
    });
    closeDetailBtn.addEventListener('click', () => {
        taskDetail.classList.add('hidden');
    });
    taskFormElement.addEventListener('submit', saveTask);
    renderTasks();
});