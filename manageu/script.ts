// TASK
class Task {
    public id: number;
    public completed: boolean
    constructor(public description: string) {
        this.id = Math.floor(Math.random() * 1001);
        this.description = description;
        this.completed = false;


    }
}

let task1 = new Task("HW");
console.log(task1);

//TaskManager
class TaskManager {
    public tasks: Task[];
    constructor() {
        this.tasks = []

    }

    addTask(description: string): void {
        this.tasks.push(new Task(description))


    }
    deleteTask(id: number) {
        let indexToDelete = this.tasks.findIndex((task: Task) => task.id == id)
        this.tasks.splice(indexToDelete, 1)
    }
    updateTypeDescription(id: number, newDescription: string): void {
        let indexToUpdate = this.tasks.findIndex((task: Task) => task.id == id)
        this.tasks[indexToUpdate].description = newDescription;

    }
    completeTask(id: number): void {
        let indexToComplete = this.tasks.findIndex((task: Task) => task.id == id);
        this.tasks[indexToComplete].completed = true;

    }



};

let manager = new TaskManager()
if (localStorage.getItem("taskList") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("taskList") as string);
    showTasksInLists();
}
console.log(manager.tasks);


function showTasksInLists() {
    document.getElementById("active")!.innerHTML = "";
    document.getElementById("completed")!.innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed == false) {
            document.getElementById("active")!.innerHTML += `
    <div> <li class="list-group-item d-inline-block w-75 mt-3">${task.description}</li> <span> <button class="btn btn-success" onclick="completeTask(${task.id})"><i class="fa-solid fa-check"></i></button> <button class="btn btn-primary" onclick="updateDescription(${task.id})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span> </div> `;
        } else {
            document.getElementById("completed")!.innerHTML += `
    <div> <li class="list-group-item d-inline-block w-75 mt-3 text-decoration-line-through">${task.description}</li> <span> <button class="btn btn-success" disabled><i class="fa-solid fa-check-double"></i></button> <button class="btn btn-primary" disabled><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" disabled><i class="fa-solid fa-trash"></i></button></span> </div> `;
        }
    }
    localStorage.setItem("taskList", JSON.stringify(manager.tasks));
}

showTasksInLists();

function completeTask(id: number) {
    manager.completeTask(id);
    showTasksInLists();
}
function deleteTask(id: number) {
    // confirm "Are you sure?"
    if (confirm("Are you sure?")) {
        manager.deleteTask(id);
        showTasksInLists();
    }

}
function updateDescription(id: number) {
    // prompt for new description
    let newDescription = prompt("Enter new description:");
    if (newDescription != null || newDescription != "") {
        manager.updateTypeDescription(id, newDescription!);
        showTasksInLists();
    } else alert("Sorry! Something went wrong");
}
function addNewTask() {
    let description = (document.getElementById("newTaskInput") as HTMLInputElement)
        .value;
    manager.addTask(description);
    (document.getElementById("newTaskInput") as HTMLInputElement).value = "";
    showTasksInLists();

}