let body = document.getElementsByClassName("color-model")[0]
let redInput = document.getElementById('r-input')
let greenInput = document.getElementById('g-input')
let blueInput = document.getElementById('b-input')

function rgbColor(){
    let redValue = redInput.value
    let greenValue = greenInput.value
    let blueValue = blueInput.value

    const rgbString = `rgb(${redValue},${greenValue},${blueValue})`
    body.style.backgroundColor = rgbString;
}

function rgbColorRandom(){
    let r = Math.floor((Math.random()*255))
    let g = Math.floor((Math.random()*255))
    let b = Math.floor((Math.random()*255))

    const rgbString = `rgb(${r},${g},${b})`
    body.style.backgroundColor = rgbString;

}