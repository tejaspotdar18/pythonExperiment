let tasks = JSON.parse(localStorage.getItem("focusflowTasks")) || [];

function addTask() {

    const subject = document.getElementById("subject").value;
    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;
    const examDate = document.getElementById("examDate").value;

    if (subject === "" || topic === "" || examDate === "") {
        alert("Please fill all fields!");
        return;
    }

    const task = {
        id: Date.now(),
        subject: subject,
        topic: topic,
        difficulty: difficulty,
        examDate: examDate,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    document.getElementById("subject").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("examDate").value = "";
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

    tasks.forEach(task => {

        const div = document.createElement("div");

        div.className = task.completed
            ? "task completed"
            : "task";

        const difficultyText =
            task.difficulty == 1
                ? "Easy"
                : task.difficulty == 2
                ? "Medium"
                : "Hard";

        div.innerHTML = `
            <div class="task-info">
                <h3>${task.subject} - ${task.topic}</h3>
                <p>Difficulty: ${difficultyText}</p>
                <p>Exam: ${task.examDate}</p>
            </div>

            <div>
                <button class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(div);
    });

    updateDashboard();
}

function completeTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const percentage =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText =
        completed;

    document.getElementById("progress").innerText =
        percentage + "%";
}

function saveTasks() {

    localStorage.setItem(
        "focusflowTasks",
        JSON.stringify(tasks)
    );
}

displayTasks();
