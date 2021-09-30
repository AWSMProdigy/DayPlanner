var todoListEl = $('#todoList');
var todoContainer = $("#todoContainer");
var todos = [];
if(localStorage.getItem("todos") == null){
    storeTodos();
  }
  else{
    getTodos();
  }
displayTodos();

function displayTodos(){
    var temp;
    for(var i = 0; i < todoContainer.siblings().length; i++){
        temp = todos.filter(obj => {
            return obj.time === i
        });

        todoContainer.children()[i].textContent = temp.task;
    }
}

function getTodos(){
    var temptodos = JSON.parse(localStorage.getItem("todos"));
    console.log(temptodos);
  
    if(temptodos.wins !== null || temptodos.wins !== undefined){
      todos.wins = temptodos.wins;
    }
    if(temptodos.losses !== null || temptodos.wins !== undefined){
      todos.losses = temptodos.losses;
    }
}

function storeTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveTodo(time, task){
    var newItem = {time: time, task: task};
    todos.push(newItem);
    storeTodos();
}

todoListEl.on("click", ".save", function(){
    var time = $(this).siblings()[0].textContent;
    var task = $(this).siblings()[1].textContent;
    if(task != ""){
        saveTodo(time, task);
    }
})

