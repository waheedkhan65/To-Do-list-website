// Show the app screen
function showApp() {
    document.getElementById("welcome-screen").classList.add("hidden");
    document.getElementById("app-screen").classList.remove("hidden");
    showDateTime();
}

// Add task to the list
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskDate = document.getElementById("task-date");
    const taskTime = document.getElementById("task-time");
    const taskList = document.getElementById("task-list");

    const task = taskInput.value.trim();
    const date = taskDate.value;
    const time = taskTime.value;

    if (task) {
        const listItem = document.createElement("li");

        let dateTimeInfo = "";
        if (date) {
            dateTimeInfo += `Date: ${new Date(date).toLocaleDateString()}`;
        }
        if (time) {
            dateTimeInfo += date ? `, Time: ${time}` : `Time: ${time}`;
        }

        listItem.innerHTML = `
            <div>
                <strong>${task}</strong>
                <p>${dateTimeInfo}</p>
            </div>
            <div class="task-buttons">
                <button onclick="editTask(this)">Edit</button>
                <button onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);

        // Clear inputs
        taskInput.value = "";
        taskDate.value = "";
        taskTime.value = "";
    } else {
        alert("Please enter a task.");
    }
}

// Delete task from the list
function deleteTask(button) {
    const taskItem = button.closest("li");
    taskItem.remove();
}

// Edit task from the list
function editTask(button) {
    const taskItem = button.closest("li");
    const taskDiv = taskItem.querySelector("div");
    const taskText = taskDiv.querySelector("strong").textContent;
    const taskInfo = taskDiv.querySelector("p").textContent;

    const [dateText, timeText] = taskInfo.replace("Date: ", "").split(", Time: ");

    // Populate inputs with current values
    document.getElementById("task-input").value = taskText;
    document.getElementById("task-date").value = dateText ? new Date(dateText).toISOString().split("T")[0] : "";
    document.getElementById("task-time").value = timeText || "";

    // Remove the existing task
    taskItem.remove();
}

// Display current date and time
function showDateTime() {
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    function updateDateTime() {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        dateElement.textContent = now.toLocaleDateString("en-PK", options); // Pakistan locale
        timeElement.textContent = now.toLocaleTimeString("en-PK");
    }

    updateDateTime();
    setInterval(updateDateTime, 1000); // Update every second
}
