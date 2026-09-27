let bgMusic;

function startHorrorAudio() {
    if (bgMusic) return;

    // En lugar del chillido/ruido generado, reproducimos la música ambiental
    // colocada en la carpeta "music".
    bgMusic = new Audio('music/Sad and lonely.mp3');
    bgMusic.loop = true;
    bgMusic.volume = 0.5;

    bgMusic.play().catch((err) => {
        console.warn('No se pudo reproducir el audio automáticamente:', err);
    });
}

function requestFullscreenSafe() {
    const el = document.documentElement;
    const request = el.requestFullscreen
        || el.webkitRequestFullscreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen;

    if (request) {
        request.call(el).catch((err) => {
            console.warn('No se pudo activar la pantalla completa:', err);
        });
    }
}

const startPrompt = document.getElementById('start-prompt');
startPrompt.addEventListener('click', () => {
    startHorrorAudio();
    requestFullscreenSafe();
    startPrompt.style.opacity = '0';
    setTimeout(() => startPrompt.remove(), 1000);
});