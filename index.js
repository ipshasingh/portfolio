const words = [
    "Software Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Flutter Developer",
    "Web Developer",    
    "RAG Engineer",
    "Python Developer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

const text = document.getElementById("typing-text");

function type(){

    const current = words[wordIndex];

    if(!deleting){

        text.textContent = current.substring(0,charIndex);

        charIndex++;

        if(charIndex > current.length){

            deleting = true;

            setTimeout(type,1500);

            return;
        }

    }else{

        text.textContent = current.substring(0,charIndex);

        charIndex--;

        if(charIndex < 0){

            deleting = false;

            charIndex = 0;

            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    setTimeout(type, deleting ? 50 : 90);
}

type();