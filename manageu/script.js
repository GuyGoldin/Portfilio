// TASK
var Task = /** @class */ (function () {
    function Task(description) {
        this.description = description;
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;
    }
    return Task;
}());
var task1 = new Task("HW");
console.log(task1);
//TaskManager
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (description) {
        this.tasks.push(new Task(description));
    };
    TaskManager.prototype.deleteTask = function (id) {
        var indexToDelete = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks.splice(indexToDelete, 1);
    };
    TaskManager.prototype.updateTypeDescription = function (id, newDescription) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToUpdate].description = newDescription;
    };
    TaskManager.prototype.completeTask = function (id) {
        var indexToComplete = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[indexToComplete].completed = true;
    };
    return TaskManager;
}());
;
var manager = new TaskManager();
if (localStorage.getItem("taskList") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("taskList"));
    showTasksInLists();
}
console.log(manager.tasks);
function showTasksInLists() {
    document.getElementById("active").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    for (var _i = 0, _a = manager.tasks; _i < _a.length; _i++) {
        var task = _a[_i];
        if (task.completed == false) {
            document.getElementById("active").innerHTML += "\n    <div> <li class=\"list-group-item d-inline-block w-75 mt-3\">".concat(task.description, "</li> <span> <button class=\"btn btn-success\" onclick=\"completeTask(").concat(task.id, ")\"><i class=\"fa-solid fa-check\"></i></button> <button class=\"btn btn-primary\" onclick=\"updateDescription(").concat(task.id, ")\"><i class=\"fa-solid fa-pen\"></i></button> <button class=\"btn btn-danger\" onclick=\"deleteTask(").concat(task.id, ")\"><i class=\"fa-solid fa-trash\"></i></button></span> </div> ");
        }
        else {
            document.getElementById("completed").innerHTML += "\n    <div> <li class=\"list-group-item d-inline-block w-75 mt-3 text-decoration-line-through\">".concat(task.description, "</li> <span> <button class=\"btn btn-success\" disabled><i class=\"fa-solid fa-check-double\"></i></button> <button class=\"btn btn-primary\" disabled><i class=\"fa-solid fa-pen\"></i></button> <button class=\"btn btn-danger\" disabled><i class=\"fa-solid fa-trash\"></i></button></span> </div> ");
        }
    }
    localStorage.setItem("taskList", JSON.stringify(manager.tasks));
}
showTasksInLists();
function completeTask(id) {
    manager.completeTask(id);
    showTasksInLists();
}
function deleteTask(id) {
    // confirm "Are you sure?"
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}
function updateDescription(id) {
    // prompt for new description
    var newDescription = prompt("Enter new description:");
    if (newDescription != null || newDescription != "") {
        manager.updateTypeDescription(id, newDescription);
        showTasksInLists();
    }
    else
        alert("Sorry! Something went wrong");
}
function addNewTask() {
    var description = document.getElementById("newTaskInput")
        .value;
    manager.addTask(description);
    document.getElementById("newTaskInput").value = "";
    showTasksInLists();
}