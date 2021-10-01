var todoContainer = $("#todoContainer");
var myClock = $("#currentDay");
var todos = [];
if(localStorage.getItem("todos") == null){
    storeTodos();
  }
  else{
    getTodos();
  }
displayTodos();
setTime();
setColors();

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

function setTime() {
    myClock.text(moment().format("LL"));
    timerInterval = setInterval(function() {
        myClock.text(moment().format("LL"));
    }, 1000);
}

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

function getTodos(){
    var temptodos = JSON.parse(localStorage.getItem("todos"));
  
    if(temptodos.length > 0){
      todos = temptodos;
    }
}

function storeTodos(){
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(JSON.parse(localStorage.getItem("todos")));
}

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

todoContainer.on("click", ".saveBtn", function(){
    var time = $(this).parent().attr('id');
    var task = $(this).siblings()[1].textContent;
    if(task != ""){
        saveTodo(time, task);
    }
})

