import { getTasks, saveTasks } from "./storage.js";
import { renderTasks } from "./ui.js";

const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const priorityInput = document.getElementById("priority");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filters button");

let tasks = getTasks();
let currentFilter = "all";

function updateUI() {
    let filteredTasks = [...tasks];

    if (currentFilter === "completed") {
        filteredTasks = filteredTasks.filter(t => t.completed);
    } else if (currentFilter === "pending") {
        filteredTasks = filteredTasks.filter(t => !t.completed);
    }

    const searchText = searchInput.value.toLowerCase();
    filteredTasks = filteredTasks.filter(t =>
        t.title.toLowerCase().includes(searchText)
    );

    renderTasks(filteredTasks, taskList);
}

addBtn.addEventListener("click", () => {
    if (!titleInput.value) return;

    tasks.push({
        title: titleInput.value,
        date: dateInput.value,
        priority: priorityInput.value,
        completed: false
    });

    saveTasks(tasks);
    titleInput.value = "";
    updateUI();
});

taskList.addEventListener("click", e => {
    if (e.target.classList.contains("toggle")) {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
    }

    if (e.target.classList.contains("delete")) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
    }

    saveTasks(tasks);
    updateUI();
});

searchInput.addEventListener("input", updateUI);

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        updateUI();
    });
});

updateUI();
