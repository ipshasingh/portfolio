let body = document.getElementsByTagName("body")[0] 
// gives the first tag inside div tag
// function gives a list of div [div]
function setColor(name){
    body.style.backgroundColor = name 
}
//console.log(body)

function randomGen(){
    //rgb values between0-255
    //math.random() generates value between 0 and 1
    const red  = Math.round(Math.random() * 255)
    const green =Math.round(Math.random() * 255)
    const blue = Math.round(Math.random() * 255)

    const color = `rgb(${red},${green},${blue})`
    body.style.backgroundColor = color;


}