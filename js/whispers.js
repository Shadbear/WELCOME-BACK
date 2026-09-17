const questions = [
    "¿Mereces Existir?",
    "¿Qué nos diferencia de Lucifer?",
    "¿Dónde termina tu existencia y comienza la mía?",
    "¿Aún recuerdas cómo se sentía estar a salvo?",
    "¿Quién controla tus pensamientos cuando duermes?",
    "¿Realmente crees que estás solo?",
    "¿El dolor que sientes es tuyo?",
    "¿Cuántas veces has muerto sin darte cuenta?",
    "¿Por qué sigues intentando entrar?",
    "Tu sombra dejó de seguirte hace tiempo."
];

const whisperContainer = document.getElementById('whisper-container');

function spawnWhisper() {
    const whisper = document.createElement('div');
    whisper.className = 'whisper-text';
    whisper.innerText = questions[Math.floor(Math.random() * questions.length)];

    const margin = 70;
    const safeZoneWidth = 500;
    const safeZoneHeight = 350;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    let x, y;
    let attempts = 0;

    while (attempts < 20) {
        x = margin + Math.random() * (window.innerWidth - margin * 2 - 200);
        y = margin + Math.random() * (window.innerHeight - margin * 2 - 50);

        if (Math.abs(x - centerX) > safeZoneWidth / 2 || Math.abs(y - centerY) > safeZoneHeight / 2) {
            break;
        }
        attempts++;
    }

    whisper.style.left = `${x}px`;
    whisper.style.top = `${y}px`;
    whisperContainer.appendChild(whisper);

    setTimeout(() => whisper.classList.add('visible'), 50);

    setTimeout(() => {
        whisper.classList.remove('visible');
        setTimeout(() => whisper.remove(), 800);
    }, 3500);
}

setInterval(spawnWhisper, 2500);