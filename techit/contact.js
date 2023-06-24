function validation() {
    var emailId = document.getElementById("emailInput").value;
    atpos = emailId.indexOf("@");
    dotpos = emailId.lastIndexOf(".");
    if (document.getElementById("firstName").value == "") {
        alert("Enter First Name");

    } else if (document.getElementById("lastName").value == "") {
        alert("Enter Last Name");
    } else if (atpos < 1 || (dotpos - atpos < 2)) {
        alert("Please enter correct email ID")
        document.getElementById("emailInput").focus();
        return false;
        alert("Enter Valid Email");
    } else if (document.getElementById("inputText").value == "") {
        alert("Enter a Message")
    } else {
        alert("Sent Successfuly!")
    }
}