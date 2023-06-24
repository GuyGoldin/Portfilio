import Action from "./classess/Action.js"
import ActionsManager from "./classess/ActionsManager.js"
let manager = new ActionsManager();
if (localStorage.getItem('whatever') != null) {
    manager.actions = JSON.parse(localStorage.getItem('whatever'))
}
console.log(manager.actions);
//manager.deleteAction(food.id);
//console.log(manager.actions);
manager.calcBalance()
console.log(manager.balance);
// a function that shows all the actions according to manager.actions array
function showActionsInTable() {
    document.getElementById("actions").innerHTML = "";
    for (let action of manager.actions) {
        document.getElementById(
            "actions"
        ).innerHTML += `<tr class=${action.type == "income" ? "text-success" : "text-danger"}> <td>${action.description} </td> <td>${action.amount} </td><td><i class="fa-regular fa-pen-to-square" onclick="updateAction(${action.id})"></i> </td> <td><i class="fa-regular fa-trash-can" onclick="deleteSelectedAction(${action.id})"></i> </td></tr>`;
    }
}
showActionsInTable();
window.addNewAction = () => {
    // take the form values
    let type = document.getElementById("type").value;
    let description = document.getElementById("description").value;
    let amount = +document.getElementById("amount").value;
    // create action object
    let newAction = new Action(type, description, amount);
    // add newAction to manager actions array
    manager.addAction(newAction);
    console.log(manager.actions);
    document.getElementById("type").value = "income";
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    showActionsInTable();
};
window.updateAction = (id) => {
    // prompt
    let newAmount = prompt("Input here a new amount")
    if (newAmount == null || newAmount == "" || newAmount != +newAmount) { alert("Sorry something went wrong!") } else {
        manager.updateAction(id, +newAmount)
    }
    showActionsInTable();
};
window.deleteSelectedAction = (id) => {
    // confirm
    let delAction = confirm("Are you sure?")
    if (delAction) {
        manager.deleteAction(id)
        console.log(manager.actions);
        showActionsInTable();
    } else {
        alert("something went wrong!")
    }
}