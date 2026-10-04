const img = document.querySelector('.game-cover');
const body = document.querySelector('.game-details-body');

function applyTheme() {
    const palette = ColorThief.getPaletteSync(img);
    
    const color1 = palette[0].hex();
    const color2 = palette[1].hex();

    body.style.setProperty('--color1', color1);
    body.style.setProperty('--color2', color2);

    body.classList.add('palette-loaded');
}

if (img.complete) {
    applyTheme();
} else {
    img.addEventListener('load', applyTheme);
}