
function addTask1(){
    //this function will work when the ADD button is clicked
    //recieves the text from the input entered by the user
    //changes the input box from input tag to p tag
    //shows the text entered by the 

    let taskField = document.getElementById("task1-txt")
    let taskValue = taskField.value;

    const taskPara = document.createElement('p')
    taskPara.textContent = taskValue;

    //taskField.parentNode.replaceChild(taskPara, taskField);
    taskField.replaceWith(taskPara)
    

}

function deleteTask(){

}

function checkTask1(){
    let checkValue = document.getElementById(task1-txt);
    checkValue.innerHTML = checkValue.strike()
}