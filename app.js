// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//DOM elements for new implementation
const documentFragment = document.createDocumentFragment();
const card = document.querySelector(".card")
const addNew = document.querySelector(".add-new")

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTodo)
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keydown', filterTask)

    //Local Storage
    document.addEventListener("DOMContentLoaded", getTaskFromLocalStorage)

    addNew.addEventListener("click", addNewItem)
}

// Add Task
function addTask(e) {
      e.preventDefault();

      if(taskInput.value === '') {
        alert('Add a task');
      } else {
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Create text node and append to li
            li.appendChild(document.createTextNode(taskInput.value));
            // Create new link element
            const link = document.createElement('a');
            // Add class
            link.className = 'delete-item secondary-content';
            // Add icon html
            link.innerHTML = '<i class="fa fa-remove"></i>';
            // Append the link to li
            li.appendChild(link);

            // Append li to ul
            taskList.appendChild(li);

            saveTaskInLocalStorage(taskInput.value);
            // Clear input
            taskInput.value = '';
      }

}

//Add new function for new implementation
function addNewItem(e) {
    e.preventDefault();
    // create task row
      const taskRow = document.createElement("div");
      taskRow.className = "row task-row";

      //create columns with class names
    const firstCol = document.createElement("div");
    firstCol.className = "col s3";

    const secondCol = document.createElement("div");
    secondCol.className = "col s6 task-item";

    const thirdCol = document.createElement("div");
    thirdCol.className = "col s3 time";

    //create child elements for first column
    let checkboxContainer = document.createElement("p");
    checkboxContainer.className = "label-container"


    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.className = "filled-in";
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("checked", "checked");
    const span = document.createElement("span");
    span.innerHTML = " ";

    label.appendChild(checkbox);
    label.appendChild(span);

      //append children of checkbox container to it
     checkboxContainer.appendChild(label);

    // append checkbox container to first col
    firstCol.appendChild(checkboxContainer);

    //create children of second column
    const taskItem = document.createElement("p");
    taskItem.className = "item";
    taskItem.innerHTML = "Find key";

    //append taskItem to second col
    secondCol.appendChild(taskItem);

    //create children of third col
    const timeElement = document.createElement("p");
    timeElement.className = "timeElement";
    timeElement.innerText = "8:30am";
    //append timeElement to third col
    thirdCol.appendChild(timeElement);

    //append columns to task row
    taskRow.appendChild(firstCol);
    taskRow.appendChild(secondCol);
    taskRow.appendChild(thirdCol);

      documentFragment.appendChild(taskRow);
      card.appendChild(documentFragment);

}

function deleteTodo(e) {
    console.log(e.target.parentElement.parentElement)
      if (e.target.parentElement.classList.contains("delete-item")) {
          e.target.parentElement.parentElement.remove();
      }
    deleteTaskFromLocalStorage(e.target.parentElement.parentElement)


}

function clearTasks() {
      while(taskList.firstChild) {
        taskList.firstChild.remove();
      }
      removeAllTasksFromLocalStorage()
}

function filterTask() {
      let filterValue = filter.value.toLowerCase();
      let listItems = document.querySelectorAll('li');
      listItems.forEach((item) => {
            if(item.textContent.toLowerCase().indexOf(filterValue) !== -1) {
                item.style.display = 'block'
            } else {
                item.style.display = "none"
            }
      })
}

//Persist to Local Storage

function saveTaskInLocalStorage(task) {
      let tasks;

      if (localStorage.getItem("tasks") === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem("tasks"))
      }

      tasks.push(task);

      localStorage.setItem("tasks", JSON.stringify(tasks))
}

//get Local Storage Items to display todo items once the page loads
function getTaskFromLocalStorage() {
      let tasks;
      
      if (localStorage.getItem("tasks") === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem("tasks"))
      }

      //loop through task array to display available todo items
      tasks.forEach((task) => {
              // Create li element
              const li = document.createElement('li');
              // Add class
              li.className = 'collection-item';
              // Create text node and append to li
              li.appendChild(document.createTextNode(task));
              // Create new link element
              const link = document.createElement('a');
              // Add class
              link.className = 'delete-item secondary-content';
              // Add icon html
              link.innerHTML = '<i class="fa fa-remove"></i>';
              // Append the link to li
              li.appendChild(link);

              // Append li to ul
              taskList.appendChild(li);
      })
}

//delete a task from Local Storage
function deleteTaskFromLocalStorage(deletedNodeElement) {
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    //loop through tasks array and deleted the item that matches the text
    //content of the deleted node element
    tasks.forEach((item, index) => {
        if (deletedNodeElement.textContent === item) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//remove all tasks from local storage
function removeAllTasksFromLocalStorage() {
    localStorage.removeItem("tasks")
}