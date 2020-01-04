// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//DOM elements for new implementation
const documentFragment = document.createDocumentFragment();
const checkboxRow = document.querySelector(".checkbox-row")
const addNew = document.querySelector(".add-new");
const date = document.querySelector(".datepicker");
const time= document.querySelector('.timepicker');
const checkbox = document.querySelector(".checkbox");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', deleteTodo)
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keydown', filterTask)
    checkboxRow.addEventListener("click", cancelTodo);
    checkboxRow.addEventListener("click", deleteCheckboxTodo);

    //Local Storage
    document.addEventListener("DOMContentLoaded", getTaskFromLocalStorage)

    // addNew.addEventListener("click", addNewItem)
}

//get value of datepicker
date.addEventListener("change", (e) => {
    console.log(e);
    console.log(e.target.value)
    console.log(moment(e.target.value).format('MMM DD'))
})

//dynamic DOM elements
function createElements(task, taskDate){
    //Checkboxes implementation
    const taskRow = document.createElement("div");
    taskRow.className = "row task-row";

    //create columns with class names
    const firstCol = document.createElement("div");
    firstCol.className = "col s2";

    const secondCol = document.createElement("div");
    secondCol.className = "col s5 task-item";

    const thirdCol = document.createElement("div");
    thirdCol.className = "col s3 time";

    const fourthCol =  document.createElement('div');
    fourthCol.className = "col s2 delete ";

    //create child elements for first column
    let checkboxContainer = document.createElement("p");
    checkboxContainer.className = "label-container"


    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.setAttribute("type", "checkbox")
    // checkbox.setAttribute("checked", "checked");
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
    taskItem.innerHTML = task;

    //append taskItem to second col
    secondCol.appendChild(taskItem);

    //create children of third col
    const dateElement = document.createElement("p");
    dateElement.className = "dateElement";
    dateElement.innerText = moment(taskDate).format("MMM DD");
    //append dateElement to third col
    thirdCol.appendChild(dateElement);


    let deleteTag = document.createElement('a')
    deleteTag.className = "delete-item";
    deleteTag.innerHTML = '<i class="fa fa-remove"></i>';

    fourthCol.appendChild(deleteTag);

    //append columns to task row
    taskRow.appendChild(firstCol);
    taskRow.appendChild(secondCol);
    taskRow.appendChild(thirdCol);
    taskRow.appendChild(fourthCol);

    documentFragment.appendChild(taskRow);
    checkboxRow.appendChild(documentFragment);
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


            //Checkboxes implementation
          createElements(taskInput.value, date.value);
          // const taskRow = document.createElement("div");
          // taskRow.className = "row task-row";
          //
          // //create columns with class names
          // const firstCol = document.createElement("div");
          // firstCol.className = "col s3";
          //
          // const secondCol = document.createElement("div");
          // secondCol.className = "col s6 task-item";
          //
          // const thirdCol = document.createElement("div");
          // thirdCol.className = "col s3 time";
          //
          // //create child elements for first column
          // let checkboxContainer = document.createElement("p");
          // checkboxContainer.className = "label-container"
          //
          //
          // const label = document.createElement("label");
          // const checkbox = document.createElement("input");
          // checkbox.className = "checkbox";
          // checkbox.setAttribute("type", "checkbox")
          // // checkbox.setAttribute("checked", "checked");
          // const span = document.createElement("span");
          // span.innerHTML = " ";
          //
          // label.appendChild(checkbox);
          // label.appendChild(span);
          //
          // //append children of checkbox container to it
          // checkboxContainer.appendChild(label);
          //
          // // append checkbox container to first col
          // firstCol.appendChild(checkboxContainer);
          //
          // //create children of second column
          // const taskItem = document.createElement("p");
          // taskItem.className = "item";
          // taskItem.innerHTML = taskInput.value;
          //
          // //append taskItem to second col
          // secondCol.appendChild(taskItem);
          //
          // //create children of third col
          // const dateElement = document.createElement("p");
          // dateElement.className = "dateElement";
          // dateElement.innerText = moment(date.value).format("MMM DD");
          // //append dateElement to third col
          // thirdCol.appendChild(dateElement);
          //
          // //append columns to task row
          // taskRow.appendChild(firstCol);
          // taskRow.appendChild(secondCol);
          // taskRow.appendChild(thirdCol);
          //
          // documentFragment.appendChild(taskRow);
          // checkboxRow.appendChild(documentFragment);

          saveTaskInLocalStorage(taskInput.value, date.value);

            // Clear input
            taskInput.value = '';
            date.value = '';
      }

}

function deleteTodo(e) {
    console.log(e.target.parentElement.parentElement)
      if (e.target.parentElement.classList.contains("delete-item")) {
          e.target.parentElement.parentElement.remove();
      }
    deleteTaskFromLocalStorage(e.target.parentElement.parentElement)

}

function deleteCheckboxTodo(e) {
        console.log(e.target.parentElement)
    if (event.target.parentElement.className === "delete-item") {
        if (e.target.parentElement.classList.contains("delete-item")) {
            console.log('it contains')
            e.target.parentElement.parentElement.parentElement.remove();
        }
        deleteCheckBoxTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement)

    }

    if (event.target.parentElement.firstChild.className === "checkbox") {
        console.log("it is a checkbox")
    }

}

function cancelTodo(e) {
    const allCheckoxes = document.querySelectorAll('.task-row')
    console.log(allCheckoxes)
    // let myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);

    if (e.target.checked === true) {
        // let myElementClone;


    //     if (!myElementClone) {
    //         console.log("no clone")
    //         myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
    //         e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
    //         myElementClone.firstChild.nextSibling.firstChild.style.textDecoration = "line-through";
    //         myElementClone.style.display = "block";
    //         checkboxRow.appendChild(myElementClone)
    //
    //     } else if (myElementClone) {
    //         console.log('there is a clone')
    //         myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
    //
    //         myElementClone.style.display = "block";
    //
    //     }
    // }


        allCheckoxes.forEach((item, i) => {
         let myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
            // console.log(item.firstChild.nextSibling.firstChild.innerHTML)
            if(myElementClone.firstChild.nextSibling.firstChild.innerHTML === item.firstChild.nextSibling.firstChild.innerHTML) {
               console.log("equal")
                e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                myElementClone.firstChild.nextSibling.firstChild.style.textDecoration = "line-through";
                myElementClone.style.display = "block";
                console.log(checkboxRow.lastChild.firstChild.nextSibling.firstChild.innerHTML);
                if (checkboxRow.lastChild.firstChild.nextSibling.firstChild.innerHTML !== myElementClone.firstChild.nextSibling.firstChild.innerHTML) {
                    checkboxRow.appendChild(myElementClone)

                } else if (checkboxRow.lastChild.firstChild.nextSibling.firstChild.innerHTML ===  myElementClone.firstChild.nextSibling.firstChild.innerHTML) {
                    checkboxRow.appendChild(myElementClone)

                }
                // item.style.display = "block";
                // console.log(item.firstChild.firstChild.firstChild.firstChild.checked)
                // item.firstChild.firstChild.firstChild.firstChild.checked = false;
                // item.firstChild.nextSibling.firstChild.style.textDecoration = "none"
                // e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";

            }else {
                // e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                // myElementClone.firstChild.nextSibling.firstChild.style.textDecoration = "line-through";
                // checkboxRow.appendChild(myElementClone)
            }
        })
        // e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.style.textDecoration = "line-through";
        // console.log(e.target.parentElement.parentElement.parentElement.parentElement)

    }
    if (e.target.checked === false) {
        for (let i = 0; i < allCheckoxes.length; i++) {
            if(e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.innerHTML === allCheckoxes[i].firstChild.nextSibling.firstChild.innerHTML) {
                console.log('it is equal');
                allCheckoxes[i].style.display = "block";
                allCheckoxes[i].firstChild.firstChild.firstChild.firstChild.checked = false;
                // item.firstChild.nextSibling.firstChild.style.textDecoration = "none"
                // e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                console.log(allCheckoxes[i].parentNode);
                console.log(e.target.parentElement.parentElement.parentElement.parentElement);
                e.target.parentElement.parentElement.parentElement.parentElement.parentNode.removeChild( e.target.parentElement.parentElement.parentElement.parentElement);
                break;
            }
        }
        console.log(allCheckoxes);


        // allCheckoxes.forEach((item, i) => {
        //     console.log(item)
        //     // console.log('inner html', e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.innerHTML)
        //     if(e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.innerHTML === item.firstChild.nextSibling.firstChild.innerHTML) {
        //         console.log('it is equal');
        //         item.style.display = "block";
        //         item.firstChild.firstChild.firstChild.firstChild.checked = false;
        //         // item.firstChild.nextSibling.firstChild.style.textDecoration = "none"
        //         // e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        //         console.log(item.parentNode);
        //         console.log(e.target.parentElement.parentElement.parentElement.parentElement);
        //         // e.target.parentElement.parentElement.parentElement.parentElement.parentNode.removeChild( e.target.parentElement.parentElement.parentElement.parentElement);
        //
        //     }


        // })

        e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.style.textDecoration = "none";

        // e.target.parentElement.parentElement.parentElement.parentElement.style.display = "block";
    }

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

function saveTaskInLocalStorage(task, taskDate) {
      let tasksObj;

      if (localStorage.getItem("tasks") === null) {
          tasksObj = [];
      } else {
          tasksObj = JSON.parse(localStorage.getItem("tasks"))
      }

    tasksObj.push({task: task, date: taskDate});

    localStorage.setItem("tasks", JSON.stringify(tasksObj))
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
          // console.log(task)
              // Create li element
              const li = document.createElement('li');
              // Add class
              li.className = 'collection-item';
              // Create text node and append to li
              li.appendChild(document.createTextNode(task.task));
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

              createElements(task.task, task.date);
      })
}

//delete a task from Local Storage
function deleteTaskFromLocalStorage(deletedNodeElement) {
    console.log(deletedNodeElement);
    console.log(deletedNodeElement.textContent)
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    //loop through tasks array and deleted the item that matches the text
    //content of the deleted node element
    tasks.forEach((item, index) => {
        console.log(item)
        if (deletedNodeElement.textContent === item) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//delete checkbox task from Local Storage
function deleteCheckBoxTaskFromLocalStorage(deletedNodeElement) {
    console.log(deletedNodeElement);
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    //loop through tasks array and deleted the item that matches the text
    //content of the deleted node element
    tasks.forEach((item, index) => {
        console.log(item)
        if (deletedNodeElement.firstChild.nextSibling.firstChild.textContent === item.task) {
            tasks.splice(index, 1)
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//remove all tasks from local storage
function removeAllTasksFromLocalStorage() {
    localStorage.removeItem("tasks")
}