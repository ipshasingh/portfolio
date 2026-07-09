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

// ---- Hover grid background (Experience section) ----
function initHoverGrid(section, cellSize = 28, fadeDelay = 220, radius = 2.2) {
    const container = section ? section.querySelector('.grid-overlay') : null;
    if (!container) return;

    const GLOW_RGB = '196,158,48'; // #C49E30
    const falloffRadius = radius + 2; // extends the fade a couple cells past the core circle

    let cols = 0;
    let rows = 0;
    let cells = [];

    function build() {
        const width = section.clientWidth;
        const height = section.clientHeight;
        const newCols = Math.max(1, Math.ceil(width / cellSize));
        const newRows = Math.max(1, Math.ceil(height / cellSize));

        // skip rebuilding if the grid dimensions haven't actually changed
        if (newCols === cols && newRows === rows) return;
        cols = newCols;
        rows = newRows;

        container.innerHTML = '';
        container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        cells = [];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < cols * rows; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cells.push(cell);
            fragment.appendChild(cell);
        }

        container.appendChild(fragment);
    }

    // sets a cell's color based on how "deep" into the circle it is —
    // solid/darker near dist 0, smoothly fading to nothing by falloffRadius.
    // No box-shadow/gradient involved, so it stays flat rather than 3D.
    function setCellIntensity(cell, intensity) {
        cell.style.backgroundColor = `rgba(${GLOW_RGB}, ${(intensity * 0.4).toFixed(3)})`;
        cell.style.borderColor = `rgba(${GLOW_RGB}, ${(intensity * 0.6).toFixed(3)})`;

        clearTimeout(cell._fadeTimer);
        cell._fadeTimer = setTimeout(() => {
            cell.style.backgroundColor = '';
            cell.style.borderColor = '';
        }, fadeDelay);
    }

    // lights up a soft-edged, pixelated circle around the center cell —
    // darkest at the core, fading out gradually rather than a hard-edged block
    function activateCluster(centerCol, centerRow) {
        const reach = Math.ceil(falloffRadius);

        for (let dr = -reach; dr <= reach; dr++) {
            for (let dc = -reach; dc <= reach; dc++) {
                const dist = Math.sqrt(dc * dc + dr * dr);
                if (dist > falloffRadius) continue;

                const col = centerCol + dc;
                const row = centerRow + dr;
                if (col < 0 || col >= cols || row < 0 || row >= rows) continue;

                const intensity = Math.pow(Math.max(0, 1 - dist / falloffRadius), 2);
                if (intensity <= 0.02) continue;

                const idx = row * cols + col;
                setCellIntensity(cells[idx], intensity);
            }
        }
    }

    build();

    // rebuild whenever the section's actual rendered size changes
    // (covers late image loads, font swaps, and window resizes alike)
    if (window.ResizeObserver) {
        const observer = new ResizeObserver(() => build());
        observer.observe(section);
    } else {
        window.addEventListener('resize', build);
    }

    // Track mouse position on the whole section rather than relying on
    // hover events landing on individual cells — this way the grid still
    // lights up correctly even when text or other content sits above it.
    section.addEventListener('mousemove', (e) => {
        if (!cols || !rows) return;
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

        const col = Math.min(cols - 1, Math.floor(x / (rect.width / cols)));
        const row = Math.min(rows - 1, Math.floor(y / (rect.height / rows)));
        activateCluster(col, row);
    });
}

initHoverGrid(document.querySelector('.page-exp'));