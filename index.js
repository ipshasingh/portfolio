const words = [
    "Software Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "Flutter Developer",
    "Web Developer",    
    "RAG Engineer",
    "Python Developer"
];
const titleEl = document.querySelector('.landing-title');
const textureEl = document.querySelector('.title-texture');

const page2 = document.querySelector('.page-2');
const bgText = document.querySelector('.page-2 .bg-text');

// ---- Mouse parallax: landing page avatar ----
const landingPage = document.querySelector('.landing-page');
const avatarCircle = document.querySelector('.img-circle');

const expTimeline = document.querySelector('.page-exp .exp-timeline');
const expDot = document.querySelector('.page-exp .exp-dot');

if (landingPage && avatarCircle) {
    landingPage.addEventListener('mousemove', (e) => {
        const rect = landingPage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const strength = 25;
        avatarCircle.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    landingPage.addEventListener('mouseleave', () => {
        avatarCircle.style.transform = 'translate(0, 0)';
    });
}

if (titleEl && textureEl) {
    titleEl.addEventListener('mousemove', (e) => {
        const rect = titleEl.getBoundingClientRect();
        const x = e.clientX - rect.left - 140;   // 140 = half the spotlight size, centers it on cursor
        const y = e.clientY - rect.top - 140;
        textureEl.style.maskPosition = `${x}px ${y}px`;
        textureEl.style.webkitMaskPosition = `${x}px ${y}px`;
    });

    titleEl.addEventListener('mouseleave', () => {
        textureEl.style.maskPosition = '-9999px -9999px';
        textureEl.style.webkitMaskPosition = '-9999px -9999px';
    });
}

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

// ---- Scroll parallax: PORTFOLIO background text ----
const bgTextWrapper = document.querySelector('.page-2 .bg-text-wrapper');
const bgTextOverlay = document.querySelector('.page-2 .bg-text-overlay');

function updatePage2Parallax(){
    if (!page2 || !bgTextWrapper) return;
    const rect = page2.getBoundingClientRect();
    const factor = 0.35;
    const offset = (factor - 1) * rect.top;
    bgTextWrapper.style.transform = `translate3d(0, ${offset}px, 0)`;

    // where the blue/white split currently sits in the viewport
    const splitY = rect.top + rect.height * 0.695;

    // where the (already-shifted) text wrapper currently sits
    const wrapperRect = bgTextWrapper.getBoundingClientRect();
    let percent = ((splitY - wrapperRect.top) / wrapperRect.height) * 100;
    percent = Math.max(0, Math.min(100, percent));   // clamp so it never over/undershoots

    if (bgTextOverlay) {
        bgTextOverlay.style.clipPath = `inset(${percent}% 0 0 0)`;
        bgTextOverlay.style.webkitClipPath = `inset(${percent}% 0 0 0)`;
    }
}

window.addEventListener('scroll', () => requestAnimationFrame(updatePage2Parallax));
window.addEventListener('resize', updatePage2Parallax);
updatePage2Parallax();

// ---- Scroll-tracking dot: Experience timeline ----


function updateExpDot(){
    if (!expTimeline || !expDot) return;

    const rect = expTimeline.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;

    let progress = (viewportCenter - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));

    expDot.style.top = `${progress * rect.height}px`;
}

window.addEventListener('scroll', () => requestAnimationFrame(updateExpDot));
window.addEventListener('resize', updateExpDot);
updateExpDot();

