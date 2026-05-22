const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");

  li.innerHTML = `
    ${taskText}
    <button class="delete">Delete</button>
  `;

  taskList.appendChild(li);

  taskInput.value = "";

  const deleteBtn = li.querySelector(".delete");

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
}