const btnIniciar = document.getElementById('btn-iniciar');
const panicContainer = document.getElementById('panic-images-container');
const titleMain = document.querySelector('.horror-title');
const buttonWrapper = document.querySelector('.button-wrapper');
const disasterScreen = document.getElementById('disaster-screen');

// Mensajes de pánico alrededor
const panicMessages = [
    "¡NO LO HAGAS!",
    "DETENTE POR FAVOR",
    "AUXILIO",
    "NOS VAS A CONDENAR",
    "¡POR FAVOR NO!",
    "AYUDA AYUDA AYUDA",
    "ES UNA TRAMPA"
];

let panicInterval;

// Al colocar el cursor sobre el botón INICIO / INICIAR
btnIniciar.addEventListener('mouseenter', () => {
    // Activa la distorsión y escala de grises en el entorno (menos en el botón)
    document.body.classList.add('monochrome-horror');

    // Inicia la generación de súplicas parpadeantes
    panicInterval = setInterval(spawnPanicBanner, 120);
});

// Al quitar el cursor
btnIniciar.addEventListener('mouseleave', () => {
    document.body.classList.remove('monochrome-horror');
    clearInterval(panicInterval);
    panicContainer.innerHTML = '';
});

btnIniciar.addEventListener('click', () => {
    // Desactivar animaciones de pánico al pasar el ratón
    document.body.classList.remove('monochrome-horror');
    clearInterval(panicInterval);
    panicContainer.innerHTML = '';

    // Ocultar vista inicial
    if (titleMain) titleMain.classList.add('hidden');
    buttonWrapper.classList.add('hidden');

    // Mostrar menú de desastres
    disasterScreen.classList.remove('hidden');
});
// Generador de carteles de auxilio
function spawnPanicBanner() {
    const banner = document.createElement('div');
    banner.className = 'panic-banner';
    banner.innerText = panicMessages[Math.floor(Math.random() * panicMessages.length)];

    const btnRect = btnIniciar.getBoundingClientRect();
    
    // Generar ángulos aleatorios alrededor del botón para alejar los carteles del centro
    const angle = Math.random() * Math.PI * 2;
    const distance = 160 + Math.random() * 200; // Mantiene los carteles a mínimo 160px del botón

    const posX = btnRect.left + (btnRect.width / 2) + Math.cos(angle) * distance;
    const posY = btnRect.top + (btnRect.height / 2) + Math.sin(angle) * distance;

    banner.style.left = `${posX - 60}px`;
    banner.style.top = `${posY - 15}px`;

    panicContainer.appendChild(banner);

    setTimeout(() => banner.remove(), 350);
}