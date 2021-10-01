var todoContainer = $("#todoContainer");
var myClock = $("#currentDay");
var todos = [];
//Get or save empty array of todos to get started
if(localStorage.getItem("todos") == null){
    storeTodos();
  }
  else{
    getTodos();
  }
//Start everything for the page
displayTodos();
setTime();
setColors();

//Sets colors according to time of day
function setColors(){
    var date = new Date();
    var hour = date.getHours();
    for(var i = 0; i < todoContainer.children().length; i++){
        if(parseInt(todoContainer.children()[i].dataset.time) < hour){
            todoContainer.children()[i].classList.add("past");
        }
        else if(parseInt(todoContainer.children()[i].dataset.time) > hour){
            todoContainer.children()[i].classList.add("future");
        }
        else{
            todoContainer.children()[i].classList.add("present");
        }
    }
}

//Sets date at top
function setTime() {
    myClock.text(moment().format("LL"));
    timerInterval = setInterval(function() {
        myClock.text(moment().format("LL"));
    }, 1000);
}

//Goes through array and prints the right task at the right hour
function displayTodos(){
    for(var i = 0; i < todoContainer.children().length; i++){
        var temp = todos.filter(obj => {      
            return obj.time === (i).toString();
        });

        if(temp.length > 0){
            todoContainer.children()[i].children[1].textContent = Object.values(temp[0])[1];
        }
    }
}

//Retrieves todos
function getTodos(){
    var temptodos = JSON.parse(localStorage.getItem("todos"));
  
    if(temptodos.length > 0){
      todos = temptodos;
    }
}

// Stores todos
function storeTodos(){
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(todos));
}

// When button is pressed, take time and task and save them into array and store them into local storage
function saveTodo(time, task){
    var found = false;
    var newItem = {time: time, task: task};
    for(var i = 0; i < todos.length; i++){
        if(todos[i].time == time){
            todos[i].task = task;
            found = true;
            break;
        }
    }
    if(!found){
        todos.push(newItem);
    }
    storeTodos();
}

// Upon clicking a button, save task
todoContainer.on("click", ".saveBtn", function(){
    var time = $(this).parent().attr('id');
    var task = $(this).siblings()[1].textContent;
    
    saveTodo(time, task);
    
})

