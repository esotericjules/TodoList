// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//DOM elements for new implementation
const documentFragment = document.createDocumentFragment();
const checkboxRow = document.querySelector(".checkbox-row")
const date = document.querySelector(".datepicker");
const checkbox = document.querySelector(".checkbox");
const taskCount = document.querySelector(".task-count");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const completedTasks = document.querySelector(".completed-tasks");
const completedTaskRow = document.querySelector(".completed-task-row");
const completedTaskCount = document.querySelector(".completed-task-count");

let counter = 0;
let completedTaskCounter = 0;
let secondCol;

// Display day, date and month
day.innerHTML = `${moment().format("dddd")} ${moment().format("D")}`;
month.innerHTML = moment().format("MMMM");


//set position of alertify notification
alertify.set('notifier','position', 'top-right');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    clearBtn.addEventListener('click', clearCheckboxTasks);
    filter.addEventListener('keydown', filterCheckboxesTodo)
    checkboxRow.addEventListener("click", cancel);
    checkboxRow.addEventListener("click", deleteCheckboxTodo);
    completedTasks.addEventListener('click', unCheckCompletedTask)
    //Local Storage
    document.addEventListener("DOMContentLoaded", getTaskFromLocalStorage)

    // addNew.addEventListener("click", addNewItem)
}


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


    let deleteTag = document.createElement('a');
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
          //use alertify to alert the user of the empty input and date value
          alertify.alert("Please add a task.");
      }else if (date.value === ''){
          alertify.alert("Please select a date.")
      }
      else {
            //Checkboxes implementation
          createElements(taskInput.value, date.value);
          saveTaskInLocalStorage(taskInput.value, date.value);

            // Clear input
            taskInput.value = '';
            date.value = '';

          taskCounter("addition");
          alertify.success('Task added successfully');
      }

}

function deleteCheckboxTodo(e) {
    if (event.target.parentElement.className === "delete-item") {
        if (e.target.parentElement.classList.contains("delete-item")) {
            //confirm delete todo using alertify
            alertify.confirm("Are you sure you want to delete the task?",
                function(){
                    alertify.success('Task deleted successfully');
                    e.target.parentElement.parentElement.parentElement.remove();
                    taskCounter("subtraction");
                    deleteCheckBoxTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement)

                },
                function(){
                    // alertify.error('');
                });
        }

    }
}

function cancelTodo(e) {
    const allCheckoxes = document.querySelectorAll('.task-row')

    if (e.target.checked === true) {
        allCheckoxes.forEach((item, i) => {
            //duplicate the checked row, check if it is the same as an item in the checkboxes HTML collection,
            // hide the target row and display the duplicated row
         let myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
            if(myElementClone.firstChild.nextSibling.firstChild.innerHTML === item.firstChild.nextSibling.firstChild.innerHTML) {
                e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
                myElementClone.firstChild.nextSibling.firstChild.style.textDecoration = "line-through";
                myElementClone.style.display = "block";
                // check if the last element in the checkboxes HTML collection is
                // not equal to the the newly duplicated element to avoid adding the
                // same duplicates to the bottom of the row and append it to the bottom
                if (checkboxRow.lastChild.firstChild.nextSibling.firstChild.innerHTML !== myElementClone.firstChild.nextSibling.firstChild.innerHTML) {
                    checkboxRow.appendChild(myElementClone)

                } else if (checkboxRow.lastChild.firstChild.nextSibling.firstChild.innerHTML ===  myElementClone.firstChild.nextSibling.firstChild.innerHTML) {
                    checkboxRow.appendChild(myElementClone)

                }
                //decrement task count
                taskCounter("subtraction");
            }
        })
    }
    // if a canceled element is unchecked, loop through the all the checkboxes rows
    // to find the one that has a second child that the innerHTML is equal to the innerTML
    // of the target element's second child, display the matching element and remove the
    // target element from the rows HTML collection
    if (e.target.checked === false) {
        for (let i = 0; i < allCheckoxes.length; i++) {
            if(e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.innerHTML === allCheckoxes[i].firstChild.nextSibling.firstChild.innerHTML) {
                allCheckoxes[i].style.display = "block";
                allCheckoxes[i].firstChild.firstChild.firstChild.firstChild.checked = false;
                e.target.parentElement.parentElement.parentElement.parentElement.parentNode.removeChild( e.target.parentElement.parentElement.parentElement.parentElement);
                taskCounter("addition"); //increment the task count
                break;
            }
        }
        e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.style.textDecoration = "none";

    }


}

function completedTaskElements(task, taskDate, completedCount) {
    //completed task info
    // const completedTaskRow = document.createElement("div");
    // completedTaskRow.className = "row completed-task-row";
    //
    // const arrowIconCol = document.createElement("div");
    //  arrowIconCol.className = "col s3";
    //
    //  const completedTaskCol = document.createElement("div");
    //  completedTaskCol.className = "col s9";
    //
    //  //create child element for arrowIconCol
    // const anchorElement = document.createElement("a");
    // anchorElement.className = "arrow-down";
    // anchorElement.innerHTML = '<i class="fa fa-angle-down fa-2x"></i>';
    //
    // //append child elements to arrowIconCol
    // arrowIconCol.appendChild(anchorElement);
    //
    // //create child element for completedTaskCol
    // const completedTaskCount = document.createElement("p");
    // completedTaskCount.className = "completed-task-count"
    // completedTaskCount.innerText = completedCount;
    //
    // //append child element to completedTaskCol
    // completedTaskCol.appendChild(completedTaskCount)
    //
    // //append columns to completedTaskRow
    // completedTaskRow.appendChild(arrowIconCol);
    // completedTaskRow.appendChild(completedTaskCol);
    //
    // documentFragment.appendChild(completedTaskRow);
    // completedTasks.appendChild(documentFragment);

    const taskRow = document.createElement("div");
    taskRow.className = "row task-row";

    //create columns with class names
    const firstCol = document.createElement("div");
    firstCol.className = "col s2";

    secondCol = document.createElement("div");
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
    dateElement.innerText = taskDate;
    //append dateElement to third col
    thirdCol.appendChild(dateElement);


    let deleteTag = document.createElement('a');
    deleteTag.className = "delete-item";
    deleteTag.innerHTML = '<i class="fa fa-remove"></i>';

    fourthCol.appendChild(deleteTag);

    //append columns to task row
    taskRow.appendChild(firstCol);
    taskRow.appendChild(secondCol);
    taskRow.appendChild(thirdCol);
    taskRow.appendChild(fourthCol);

    console.log(taskRow)
    documentFragment.appendChild(taskRow);
    completedTasks.appendChild(documentFragment);

}

function cancel(e) {
    //on check of a task, create a new div and append a duplicate of the checked row to it.
    // hide the checked row
    // use a inner HTML of a P element to display the number of the completed
    // task on top of the new rows.
    //if a row is clicked in the completed row elements, check if the inner HTML of the second child
    // matches the inner HTML of the second child element of any checkboxes row, display that row
    // and remove the duplicate from the completed tasks HTML

    const allCheckboxes = document.querySelectorAll('.task-row')
    if (e.target.checked === true) {
        completedTaskCounter++;
            let myElementClone = e.target.parentElement.parentElement.parentElement.parentElement.cloneNode(true);
            e.target.parentElement.parentElement.parentElement.parentElement.style.display = "none";
            myElementClone.firstChild.nextSibling.firstChild.style.textDecoration = "line-through";
            myElementClone.style.display = "block";
            myElementClone.style.borderBottom = "none";
            completedTasks.style.display = "block";
            completedTaskCount.innerHTML = `${completedTaskCounter} completed tasks`;

            completedTasks.appendChild(myElementClone);
            taskCounter("subtraction");
            //THIS IS WHERE I STOPPED
        console.log('clone', myElementClone);
        let childNodesOfMyElementClone = myElementClone.childNodes;
        let task = childNodesOfMyElementClone[1].innerText;
        let taskDate = childNodesOfMyElementClone[2].innerText;
        console.log('task', task, 'taskDate',taskDate)
        saveCanceledTaskInLocalStorage(task, taskDate)
        deleteCheckBoxTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement.parentElement)
}

        if (completedTaskCounter > 0) {
        completedTasks.style.display = 'block';
    }


}

//Function to handle when a completed task is unchecked.
// If the task is unchecked, match the element to the checkbox-row
// display the matching element in the checkbox row and remove
// the element from the completed task row
function unCheckCompletedTask(e) {
    const allCheckboxes = document.querySelectorAll('.task-row');
    console.log('allCheckboxes', allCheckboxes)

    if (e.target.checked === false) {
        completedTaskCounter--;
         console.log(e.target);
        for (let i = 0; i < allCheckboxes.length; i++) {
            console.log(i)
            if(e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.innerHTML === allCheckboxes[i].firstChild.nextSibling.firstChild.innerHTML) {
                console.log('it is equal')
                allCheckboxes[i].style.display = "block";
                allCheckboxes[i].firstChild.firstChild.firstChild.firstChild.checked = false;
                e.target.parentElement.parentElement.parentElement.parentElement.parentNode.removeChild( e.target.parentElement.parentElement.parentElement.parentElement);
                taskCounter("addition"); //increment the task count
                completedTaskCount.innerHTML = `${completedTaskCounter} completed tasks`;
                break;
            }
        }
        e.target.parentElement.parentElement.parentElement.nextSibling.firstChild.style.textDecoration = "none";
        // hide the completedTaskCount if completedTaskCounter = 0;
        if (completedTaskCounter === 0) {
            completedTasks.style.display = 'none';
        }
    }

}

function clearCheckboxTasks() {
    while(checkboxRow.firstChild) {
        checkboxRow.firstChild.remove();
    }
    removeAllTasksFromLocalStorage()
    taskCounter();
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

function saveCanceledTaskInLocalStorage(cancelledTask, cancelledTaskDate) {
    let cancelledTaskObj;
    
    if (localStorage.getItem("cancelledTasks") === null) {
        cancelledTaskObj = [];
    } else {
        cancelledTaskObj = JSON.parse(localStorage.getItem("cancelledTasks"))
    }

    cancelledTaskObj.push({cancelledTask: cancelledTask, cancelledTaskDate: cancelledTaskDate})
    
    localStorage.setItem("cancelledTasks", JSON.stringify(cancelledTaskObj))
}

function filterCheckboxesTodo() {
    //loop through the an array of tasks
    //find the item in the array that does not contains the input value
    //set the display of the elements that does not contain the value to none
    let filterValue = filter.value.toLowerCase();
    let tasks = document.querySelectorAll(".task-item");

    tasks.forEach(item => {
        if (item.innerText.toLowerCase().indexOf(filterValue) !== -1) {
            item.parentElement.style.display = "block"
        } else{
            item.parentElement.style.display = "none"
        }
    })

}

//get Local Storage Items to display todo items once the page loads
function getTaskFromLocalStorage() {
      let tasks;
    let cancelledTaskObj;

    if (localStorage.getItem("cancelledTasks") === null) {
        cancelledTaskObj = [];
    } else {
        cancelledTaskObj = JSON.parse(localStorage.getItem("cancelledTasks"))
    }


    if (localStorage.getItem("tasks") === null) {
          tasks = [];
      } else {
          tasks = JSON.parse(localStorage.getItem("tasks"))
      }
    console.log({tasks})

      //loop through task array to display available todo items
      tasks.forEach((task) => {
             //display tasks in the UI
              createElements(task.task, task.date);
              taskCounter("addition");
      });

      console.log({cancelledTaskObj})
    cancelledTaskObj.forEach((cancelledTask) => {
        console.log('cancelled')
        completedTaskCounter = 1
        completedTaskElements(cancelledTask.cancelledTask, cancelledTask.cancelledTaskDate)
    })
    completedTaskCounter = cancelledTaskObj.length;
    completedTaskCount.innerHTML = `${completedTaskCounter} completed tasks`;

    if (completedTaskCounter > 0) {
        completedTasks.style.display = 'block';

        secondCol.firstChild.style.textDecoration = "line-through";

    }


}

//delete checkbox task from Local Storage
function deleteCheckBoxTaskFromLocalStorage(deletedNodeElement) {
    // console.log(deletedNodeElement);
    let tasks;

    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

    //loop through tasks array and deleted the item that matches the text
    //content of the deleted node element
    tasks.forEach((item, index) => {
        // console.log(item)
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

function taskCounter(action) {
    if (action === "addition") {
        counter += 1;
        return taskCount.innerHTML = counter === 1 ?`${counter} Task`  : `${counter} Tasks`;
    } else if (action === "subtraction") {
        counter -= 1;
        return taskCount.innerHTML = counter === 1 ?`${counter} Task`  : `${counter} Tasks`;
    } else {
        counter = 0;
        taskCount.innerHTML = `${counter} Tasks`;
    }

    }