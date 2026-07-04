// get what the user has typed
const input = document.getElementById("str-input");  //gives the whole tag to js

function check(){
    const value = input.value; //gives value of text input
    let j = 0;
    let flag = 0;
    for (let i=value.length; i >=0; i--){
        if (value[i-1]== value[j]){
            flag = 0;
        }
        else{
            flag = 1;
            break;
        }
        j++;
    }
    
    if (flag == 0){
        alert("This is a Palindrome") //msg that will pop in browser
    }
    else{
        alert("This is not a Palindrome")
    }
    

}


