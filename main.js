const taskAddContainer = document.getElementById("add_new_task_input");
const adviceOptions = ["deleting this task"];
const searchTool = document.getElementById('search_tool');

function createAdviceWindow(selectedAdvice) {
  const adviceWindow = `<div class="window_content">
<p> Are you sure about ${selectedAdvice} ? </p>
<button id="confirm_whatever">Yes</button>
<button id="cancel_whatever">No</button>
</div>`;
  return adviceWindow;
}

function createEditWindow(previousName) {
  const editWindow = `<div class="window_content_edit">
    <div class="window_edit_title">
    <p> Rewrite your task named "${previousName}": </p>
    </div>
    <div class="window_edit_inputs">
    <input type="text" name="task_name" id="task_name" placeholder="${previousName}" maxLength="50" required>
    <input type="date" name="task_date" id="task_date" required>
    <svg id="task_edit_confirmed" width="62px" height="62px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>ic_fluent_checkbox_checked_24_filled</title>
    <desc>Created with Sketch.</desc>
    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="ic_fluent_checkbox_checked_24_filled" fill="#444444" fill-rule="nonzero">
            <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z" id="🎨-Color">

</path>
        </g>
    </g>
</svg>
    <svg id="task_edit_canceled" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z" fill="#444444"/>
    </svg>
    </div>
    </div>
  `;
  return editWindow;
}

let isInputView = false;

taskAddContainer.addEventListener("click", (event) => {
  if (!isInputView) {
    handleClick();
  }

  const target = event.target;
  if (isInputView && target.closest("#task_canceled")) {
    handleBack();
  }

  if (isInputView && target.closest("#task_confirmed")) {
    confirmTask();
  }
});

function handleClick() {
  if (isInputView) return;

  taskAddContainer.classList.add("no-hover");
  taskAddContainer.innerHTML = `
    <input type="text" name="task_name" id="task_name" placeholder="Buy a carrot" maxLength="50" required>
    <input type="date" name="task_date" id="task_date" required>
    <svg id="task_confirmed" width="62px" height="62px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>ic_fluent_checkbox_checked_24_filled</title>
    <desc>Created with Sketch.</desc>
    <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="ic_fluent_checkbox_checked_24_filled" fill="#444444" fill-rule="nonzero">
            <path d="M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z" id="🎨-Color">

</path>
        </g>
    </g>
</svg>
    <svg id="task_canceled" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM13.92 16.13H9C8.59 16.13 8.25 15.79 8.25 15.38C8.25 14.97 8.59 14.63 9 14.63H13.92C15.2 14.63 16.25 13.59 16.25 12.3C16.25 11.01 15.21 9.97 13.92 9.97H8.85L9.11 10.23C9.4 10.53 9.4 11 9.1 11.3C8.95 11.45 8.76 11.52 8.57 11.52C8.38 11.52 8.19 11.45 8.04 11.3L6.47 9.72C6.18 9.43 6.18 8.95 6.47 8.66L8.04 7.09C8.33 6.8 8.81 6.8 9.1 7.09C9.39 7.38 9.39 7.86 9.1 8.15L8.77 8.48H13.92C16.03 8.48 17.75 10.2 17.75 12.31C17.75 14.42 16.03 16.13 13.92 16.13Z" fill="#444444"/>
    </svg>
  `;

  isInputView = true;
}

function handleBack() {
  if (!isInputView) return;

  taskAddContainer.innerHTML = `
    <svg version="1.1" id="add_btn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
        viewBox="0 0 511.999 511.999" xml:space="preserve">
      <circle cx="255.999" cy="255.999" r="255.999" fill="#444444"/>
      <g>
        <rect x="243.999" y="119.999" fill="#FFFFFF" width="24" height="272.001"/>
        <rect x="119.999" y="243.999" fill="#FFFFFF" width="272.001" height="24"/>
      </g>
    </svg>
    <p>Add a new task</p>
  `;
  taskAddContainer.classList.remove("no-hover");

  isInputView = false;
}

function confirmTask() {
  const textInput = document.getElementById("task_name");
  const dateInput = document.getElementById("task_date");
  const taskList = document.getElementById("task_list");
  const checkboxUnmarked = `<svg class="unmarked_cb" xmlns="http://www.w3.org/2000/svg" width="164.5" height="157.562" viewBox="0 0 164.562 157.562">
    <path id="cb_square" data-name="Rectángulo 2" fill="none" stroke="#444444" stroke-width="10.583" fill-rule="evenodd" 
      d="M123,126H277V273H123V126Z" transform="translate(-300.719 -120.719)"/>
  </svg>`;
  const editTask = `<svg class="task_edit" width="50px" height="50px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fill-rule="evenodd">
      <path d="m0 0h32v32h-32z"/>
      <path d="m24 2c3.3137085 0 6 2.6862915 6 6v16c0 3.3137085-2.6862915 6-6 6h-16c-3.3137085 0-6-2.6862915-6-6v-16c0-3.3137085 2.6862915-6 6-6zm-.3436508 6.42893219c-.7810486-.78104859-2.0473786-.78104859-2.8284271 0l-8.6888868 8.68888671c-.2761731.2761732-.5104094.5913054-.6952518.9353643l-2.03239132 3.78302c-.09385337.1746953-.09532506.3844806-.00393188.5604754.15271557.2940827.51491707.4086833.8089997.2559678l3.5680876-1.8528891c.4541422-.2358337.8693897-.5399861 1.231234-.9018304l8.6405676-8.6405676c.7810486-.7810486.7810486-2.04737853 0-2.82842711z" fill="#444444"/>
    </g>
  </svg>`;
  const deleteTask = `<svg class="task_delete" width="50px" height="50px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>cross-square</title>
    <g id="Icon-Set-Filled" transform="translate(-206.000000, -1037.000000)" fill="#444444">
      <path d="M226.95,1056.54 C227.34,1056.93 227.34,1057.56 226.95,1057.95 C226.559,1058.34 225.926,1058.34 225.536,1057.95 L222,1054.41 L218.464,1057.95 C218.074,1058.34 217.441,1058.34 217.05,1057.95 C216.66,1057.56 216.66,1056.93 217.05,1056.54 L220.586,1053 L217.05,1049.46 C216.66,1049.07 216.66,1048.44 217.05,1048.05 C217.441,1047.66 218.074,1047.66 218.464,1048.05 L222,1051.59 L225.536,1048.05 C225.926,1047.66 226.559,1047.66 226.95,1048.05 C227.34,1048.44 227.34,1049.07 226.95,1049.46 L223.414,1053 L226.95,1056.54 Z M234,1037 L210,1037 C207.791,1037 206,1038.79 206,1041 L206,1065 C206,1067.21 207.791,1069 210,1069 L234,1069 C236.209,1069 238,1067.21 238,1065 L238,1041 C238,1038.79 236.209,1037 234,1037 L234,1037 Z" id="cross-square"/>
    </g>
  </svg>`;

  let text = textInput.value;
  let dateBadFormat = dateInput.value;
  let dateValues = dateBadFormat.split("-");
  let date = dateValues[2] + "-" + dateValues[1] + "-" + dateValues[0];

  if (text != "" && date.length === 10) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `${checkboxUnmarked} 
      <div class="task_separator"> <span class="name_selected">${text}</span> <span class="date_selected"> ${date} </span> </div> 
      <div class="task_input_separator"> ${editTask} ${deleteTask} </div>
    `;
    taskList.appendChild(newTask);

    handleBack();

    addCheckboxEventListeners();

    let taskNamesSpan = taskList.querySelectorAll(".name_selected");
    let taskNames = Array.from(taskNamesSpan).map((task) => task.textContent);
    let taskDates = taskList.querySelectorAll(".date_selected");
    let taskEditButtons = taskList.querySelectorAll(".task_edit");
    let taskDeleteButtons = taskList.querySelectorAll(".task_delete");

    taskEditButtons.forEach((button, index) => {
      button.onclick = function (event) {
        let parent = event.target.closest("li");
        if (parent) {
          let confirmEditWindow = document.createElement("div");
          confirmEditWindow.id = "window_node";
          confirmEditWindow.classList.add("node");
          confirmEditWindow.innerHTML = createEditWindow(taskNames[index]);
          document.body.appendChild(confirmEditWindow);

          let isWindowSet = true;
          let newTaskName = confirmEditWindow.querySelector("#task_name");
          let newTaskDate = confirmEditWindow.querySelector("#task_date");
          let rewriteBtn = confirmEditWindow.querySelector(
            "#task_edit_confirmed"
          );
          let backBtn = confirmEditWindow.querySelector("#task_edit_canceled");

          rewriteBtn.onclick = function () {
            let newTaskDateValue = newTaskDate.value;

            if (newTaskDateValue) {
              let newDateValues = newTaskDateValue.split("-");
              let dateFixed =
                newDateValues[2] +
                "-" +
                newDateValues[1] +
                "-" +
                newDateValues[0];
              if (newTaskName.value == "" && newTaskDateValue.length === 10) {
                changeTaskParams(
                  taskNamesSpan[index],
                  taskDates[index],
                  taskNames[index],
                  dateFixed
                );
                confirmEditWindow.remove();
                isWindowSet = false;
              } else if (newTaskDateValue.length === 10) {
                changeTaskParams(
                  taskNamesSpan[index],
                  taskDates[index],
                  newTaskName.value,
                  dateFixed
                );
                confirmEditWindow.remove();
                isWindowSet = false;
              }
            }
          };

          backBtn.onclick = function () {
            confirmEditWindow.remove();
            isWindowSet = false;
          };

        }
      };
    });

    taskDeleteButtons.forEach((button) => {
      button.onclick = function (event) {
        let parent = event.target.closest("li");
        if (parent) {
          let selectedAdvice = adviceOptions[0];
          let confirmDeleteWindow = document.createElement("div");
          confirmDeleteWindow.id = "window_node";
          confirmDeleteWindow.classList.add("node");
          confirmDeleteWindow.innerHTML = createAdviceWindow(selectedAdvice);
          document.body.appendChild(confirmDeleteWindow);
          let isWindowSet = true;

          document.addEventListener("click", function (event) {
            if (event.target.id == "confirm_whatever" && isWindowSet) {
              confirmDeleteWindow.remove();
              parent.remove();
            } else if (event.target.id == "cancel_whatever" && isWindowSet) {
              confirmDeleteWindow.remove();
              isWindowSet = false;
            }
          });
        }
      };
    });
  }
}

function changeTaskParams(oldTitle, oldDate, newTitleValue, newDateValue) {
  oldTitle.innerHTML = newTitleValue;
  oldDate.innerHTML = newDateValue;
}

function filterTasks() {
  const searchTerm = searchTool.value.toLowerCase();
  const tasks = document.querySelectorAll('#task_list li');  
  
  tasks.forEach(task => {
    const taskName = task.querySelector('.name_selected').textContent.toLowerCase();
    if (taskName.includes(searchTerm)) {
      task.style.display = '';  
    } else {
      task.style.display = 'none';  
    }
  });
}

function handleTaskCheckboxClick(event) {
  const checkbox = event.target.closest('.unmarked_cb');
  if (checkbox) {
    const taskItem = checkbox.closest('li');
    const taskName = taskItem.querySelector('.name_selected');
    const taskDate = taskItem.querySelector('.date_selected');

    if (checkbox.style.backgroundImage) {
      checkbox.style.backgroundImage = '';
      taskName.style.textDecoration = '';
      taskDate.style.textDecoration = '';
      taskItem.style.display = '';
    } else {
      checkbox.style.backgroundImage = 'url("./images/check-svgrepo-com.svg")';
      checkbox.style.backgroundSize = 'contain';
      checkbox.style.backgroundRepeat = 'no-repeat';
      taskName.style.textDecoration = 'line-through';
      taskDate.style.textDecoration = 'line-through';

      const message = document.createElement('div');
      message.className = 'task-completed-message';
      message.innerText = 'Task completed! Mark Theuss to see it!';
      document.body.appendChild(message);

      setTimeout(() => {
        message.remove();
      }, 3000);

      const theussCheckbox = document.getElementById('theuss_cb');
      if (!theussCheckbox.style.backgroundImage) {
        taskItem.style.display = 'none';
      }
    }
  }
}

function handleTheussCheckboxClick(event) {
  const checkbox = event.target.closest('#theuss_cb');
  if (checkbox) {
    const tasks = document.querySelectorAll('#task_list li');
    if (checkbox.style.backgroundImage) {
      checkbox.style.backgroundImage = '';
      tasks.forEach(task => {
        const taskCheckbox = task.querySelector('.unmarked_cb');
        if (taskCheckbox && taskCheckbox.style.backgroundImage) {
          task.style.display = 'none';
        }
      });
    } else {
      checkbox.style.backgroundImage = 'url("./images/check-svgrepo-com.svg")';
      checkbox.style.backgroundSize = 'contain';
      checkbox.style.backgroundRepeat = 'no-repeat';
      tasks.forEach(task => {
        const taskCheckbox = task.querySelector('.unmarked_cb');
        if (taskCheckbox && taskCheckbox.style.backgroundImage) {
          task.style.display = '';
        }
      });
    }
  }
}

function addCheckboxEventListeners() {
  const unmarkedCheckboxes = document.querySelectorAll('.unmarked_cb');
  unmarkedCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('click', handleTaskCheckboxClick);
  });

  const theussCheckbox = document.getElementById('theuss_cb');
  if (theussCheckbox) {
    theussCheckbox.addEventListener('click', handleTheussCheckboxClick);
  }
}

searchTool.addEventListener('input', filterTasks);

document.addEventListener('DOMContentLoaded', () => {
  addCheckboxEventListeners();
});