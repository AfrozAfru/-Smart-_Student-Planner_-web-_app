export function renderTasks(tasks, listElement) {
    listElement.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
          <span class="${task.completed ? 'done' : ''}">
            ${task.title} - ${task.date}
            <strong class="${task.priority.toLowerCase()}">
              (${task.priority})
            </strong>
          </span>
          <div>
            <button data-index="${index}" class="toggle">✔</button>
            <button data-index="${index}" class="delete">✖</button>
          </div>
        `;

        listElement.appendChild(li);
    });
}
