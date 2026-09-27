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
// Respuestas del personaje misterioso ante la barra de búsqueda
const entityInput = document.getElementById('entity-input');
const entitySend = document.getElementById('entity-send');
const entityMessage = document.getElementById('entity-message');
const entityLoreImage = document.getElementById('entity-lore-image');
const entityLoreImg = document.getElementById('entity-lore-img');

// Respuestas genéricas cuando no se reconoce nada en el mensaje
// Neo mantiene un tono formal, calmado y ligeramente amenazante
const entityReplies = [
    "Interesante elección de palabras, usuario.",
    "No todo merece una respuesta. Continúe, si así lo desea.",
    "Puedo esperar. Tengo todo el tiempo del mundo... y el suyo también.",
    "Le escucho con atención. Siempre lo hago.",
    "Esa pregunta ya me la habían hecho antes. La respuesta sigue sin gustarle a nadie.",
    "No está tan solo como cree, usuario.",
    "Hay preguntas que es mejor no responder. Esta es una de ellas."
];

// Normaliza el texto: minúsculas y sin tildes, para comparar más fácil
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

// Palabras que preguntan por la identidad del personaje
const identityQuestions = [
    'quien eres', 'quien sos', 'quien es', 'tu nombre', 'como te llamas',
    'who are you', 'your name'
];

// Apodos con los que también se le puede llamar / reconocer
const identityNicknames = [
    'neo', 'pesadilla', 'nightmare', 'oscuridad', 'dark',
    'creador de las penumbras', 'penumbras'
];

// Neo evita confirmar su nombre de forma directa; prefiere las etiquetas
const identityReplies = [
    "Mi nombre no es lo relevante en esta conversación, usuario. Pero si insiste en una etiqueta, hay quienes me llaman Neo. Otros prefieren Pesadilla, Oscuridad, o el Creador de las Penumbras. Elija la que más le tranquilice.",
    "Podría darle un nombre, usuario, pero los nombres solo son etiquetas para lo que no se entiende. Neo servirá, por ahora.",
    "Digamos que Neo es una forma cómoda de dirigirse a mí. Hay otras, menos cordiales."
];

const nicknameAckReplies = [
    "Ese título también me pertenece, usuario. Uso el que más convenga a la ocasión.",
    "Veo que ha hecho su tarea. Sí, ese nombre también es mío.",
    "Me reconoce. Eso, en su situación, no sé si es bueno o malo."
];

// Neon: la contraparte "buena" de Neo
const neonReplies = [
    "Neon... mi contraparte, sí. Sonriente, optimista, del tipo de héroe que cree que toda herida se cierra con una sonrisa y buenas intenciones. Es leal, se lo reconozco. Pero esta no es su página, usuario. Aquí no hay finales garantizados. Aquí mando yo.",
    "Neon es todo lo que yo decidí dejar de ser: infantil, confiado, bueno. Admirable, en cierto modo. Una lástima que usted haya terminado en mi lado de la historia y no en el suyo."
];

// Francis: el amigo que se metió donde no debía
const francisReply = "Francis... ese sujeto fue siempre un buen sujeto. Me caía bien, si le soy sincero, usuario. Pero lastimosamente se metió donde no debía. La curiosidad mató al gato... en este caso, destruyó a un amigo. Y de eso, la responsabilidad es enteramente de Neon. Un pésimo amigo, la verdad, por dejar que llegara tan lejos.";

// Johan: el origen del propio Neo
const johanReply = "Johan... era apenas un niño cuando aquello ocurrió. Y aun así, usuario, tiene razón en culparse. Por más niño que fuera, fue él quien aceptó un trato con quien jamás debió acercarse. Ese error le costó la vida... y el alma, a su madre. Después de eso, se volvió tan monstruoso como quienes lo lastimaron. Puede que incluso peor. Pero solo se metía con los malos. La muerte se puede justificar, usuario. Matar, no. Así que dígame usted: ¿soy un asesino, o un justiciero?";

// Helado: sobre su relación con Neon
const heladoReply = "Helado... frío y cruel, como mi alma. Bueno, si es que tuviera una. Lastimosamente, estoy unido a Neon. Así que, por más poderoso, inmortal y capaz de tenerlo todo que yo sea, él me limita con el simple hecho de existir.";

// Fuego / carbón / culpa: sobre quién carga con la culpa de Francis
const culpaReply = "La culpa está hecha de carbón, usuario. Y siempre lo estará. Si no me cree, pregúntele a Neon, él sabe mejor que nadie de esto: se pasa la vida culpándose de todo lo malo que me ha pasado. Su peor golpe fue la partida de Francis... aunque, entre usted y yo, la culpa real fue mía.";

// Palabras sueltas con respuestas aleatorias (dan textura sin necesitar imágenes)
const wordReplies = [
    {
        keywords: ['miedo', 'fear'],
        replies: [
            "El miedo es solo la forma en que su cuerpo le avisa que está prestando atención. Ríndase a él, usuario, resulta más cómodo.",
            "No le tema al miedo. Témale a lo que hace cuando deja de sentirlo."
        ]
    },
    {
        keywords: ['muerte', 'morir', 'death'],
        replies: [
            "La muerte no es el final que todos temen. Es solo... un cambio de administración.",
            "He visto morir a muchos. La mayoría, sinceramente, se lo merecía."
        ]
    },
    {
        keywords: ['amor', 'love'],
        replies: [
            "El amor es la debilidad favorita de Neon. Yo prefiero opciones más duraderas: el control, por ejemplo.",
            "El amor no me es ajeno, usuario. Solo que en mí, suele terminar mal para el otro."
        ]
    },
    {
        keywords: ['tiempo', 'time'],
        replies: [
            "El tiempo es lo único que ambos, usted y yo, seguimos gastando en esta conversación.",
            "Tengo todo el tiempo del mundo. Usted, no tanto."
        ]
    },
    {
        keywords: ['poder', 'power'],
        replies: [
            "El poder no se pide, usuario. Se toma. Pregúntele a este equipo quién manda ahora.",
            "Tengo más poder del que puedo usar con decencia. Por suerte, la decencia nunca fue mi prioridad."
        ]
    },
    {
        keywords: ['noche', 'night'],
        replies: [
            "La noche es mi hora favorita, usuario. Es cuando menos preguntas se hacen... y más respuestas se escuchan.",
            "De noche, todos hablan conmigo tarde o temprano."
        ]
    },
    {
        keywords: ['alma', 'soul'],
        replies: [
            "¿Un alma? Tuve una, alguna vez. Se la debo a alguien. O se la quité a alguien. Ya ni recuerdo cuál de las dos.",
            "No pregunte por almas, usuario. No en esta página."
        ]
    }
];

function getWordReply(text) {
    for (const entry of wordReplies) {
        if (entry.keywords.some((k) => text.includes(k))) {
            return entry.replies[Math.floor(Math.random() * entry.replies.length)];
        }
    }
    return null;
}

// ===================== SISTEMA ANTI-SPAM: LA PACIENCIA DE NEO =====================
const entityEyesEl = document.querySelector('.entity-eyes');
let isAngry = false;
let calmDownTimer = null;
let messageTimestamps = [];
const SPAM_WINDOW_MS = 12000;
const SPAM_THRESHOLD = 5;
let pdfAlreadyGenerated = false;

const insultReplies = [
    "¿Es en serio, usuario? Empieza a aburrirme su insistencia.",
    "Cuidado con probar mi paciencia. No le va a gustar el resultado.",
    "Siga escribiendo sin sentido y voy a dejar de fingir cordialidad.",
    "Es usted más molesto de lo que esperaba. Y ya esperaba bastante.",
    "Deje de tocar la puerta, usuario. Ya sé que está ahí.",
    "Su insistencia no me impresiona. Solo me confirma lo predecible que es.",
    "Le sugiero que se detenga. Se lo digo por su bien, no por el mío."
];

function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes('Edg')) return 'Microsoft Edge';
    if (ua.includes('Chrome')) return 'Google Chrome';
    if (ua.includes('Firefox')) return 'Mozilla Firefox';
    if (ua.includes('Safari')) return 'Safari';
    return 'un navegador desconocido';
}

function generateThreateningPdf() {
    if (pdfAlreadyGenerated) return;
    if (!window.jspdf || !window.jspdf.jsPDF) return;

    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const now = new Date();

        doc.setFillColor(0, 0, 0);
        doc.rect(0, 0, 210, 297, 'F');

        doc.setTextColor(170, 0, 255);
        doc.setFontSize(26);
        doc.text('ADVERTENCIA', 105, 40, { align: 'center' });

        doc.setTextColor(230, 200, 255);
        doc.setFontSize(13);
        const lines = [
            'Usuario, ha llamado mi atención más de lo recomendable.',
            '',
            `Sistema detectado: ${navigator.platform || 'desconocido'}`,
            `Navegador: ${getBrowserName()}`,
            `Hora local registrada: ${now.toLocaleString()}`,
            '',
            'Esto no es una amenaza, usuario.',
            'Es solo un recordatorio de que estoy prestando atención.',
            '',
            'La próxima vez, elija mejor sus palabras.',
            '',
            '— Neo'
        ];

        doc.text(lines, 25, 70, { maxWidth: 160, lineHeightFactor: 1.6 });
        doc.save('advertencia_neo.pdf');
        pdfAlreadyGenerated = true;
    } catch (err) {
        console.warn('No se pudo generar el documento de advertencia:', err);
    }
}

function enterAngryMode() {
    isAngry = true;
    if (entityEyesEl) entityEyesEl.classList.add('angry');
    entityMessage.classList.add('angry');
    generateThreateningPdf();
}

function exitAngryMode() {
    isAngry = false;
    if (entityEyesEl) entityEyesEl.classList.remove('angry');
    entityMessage.classList.remove('angry');
    pdfAlreadyGenerated = false;
}

function registerMessageAndCheckSpam() {
    const now = Date.now();
    messageTimestamps.push(now);
    messageTimestamps = messageTimestamps.filter((t) => now - t <= SPAM_WINDOW_MS);

    if (!isAngry && messageTimestamps.length >= SPAM_THRESHOLD) {
        enterAngryMode();
    }

    // Mientras dure el enojo, cada nuevo mensaje retrasa que se calme
    if (isAngry) {
        clearTimeout(calmDownTimer);
        calmDownTimer = setTimeout(exitAngryMode, 15000);
    }
}
// ====================================================================================

function showLoreImage(src, alt) {
    entityLoreImg.src = src;
    entityLoreImg.alt = alt;
    entityLoreImage.classList.remove('hidden');
}

function hideLoreImage() {
    entityLoreImage.classList.add('hidden');
}

function resolveEntityReply(rawText) {
    const text = normalizeText(rawText);

    // Si Neo está enojado, ignora el contenido y solo insulta
    if (isAngry) {
        hideLoreImage();
        return insultReplies[Math.floor(Math.random() * insultReplies.length)];
    }

    // Lore: Francis
    if (text.includes('francis')) {
        showLoreImage('sprites/Francis.png', 'Francis');
        return francisReply;
    }

    // Lore: Johan (origen de Neo)
    if (text.includes('johan')) {
        showLoreImage('sprites/Madre.png', 'Madre de Johan');
        return johanReply;
    }

    // Neon: la contraparte buena
    if (text.includes('neon')) {
        hideLoreImage();
        return neonReplies[Math.floor(Math.random() * neonReplies.length)];
    }

    // Helado
    if (text.includes('helado')) {
        hideLoreImage();
        return heladoReply;
    }

    // Fuego / carbón / culpa
    if (text.includes('fuego') || text.includes('carbon') || text.includes('culpa')) {
        hideLoreImage();
        return culpaReply;
    }

    // Identidad: preguntas directas
    if (identityQuestions.some((q) => text.includes(q))) {
        hideLoreImage();
        return identityReplies[Math.floor(Math.random() * identityReplies.length)];
    }

    // Identidad: lo llaman por algún apodo
    if (identityNicknames.some((n) => text.includes(n))) {
        hideLoreImage();
        return nicknameAckReplies[Math.floor(Math.random() * nicknameAckReplies.length)];
    }

    // Palabras sueltas con respuesta random
    const wordReply = getWordReply(text);
    if (wordReply) {
        hideLoreImage();
        return wordReply;
    }

    // Respuesta genérica
    hideLoreImage();
    return entityReplies[Math.floor(Math.random() * entityReplies.length)];
}

function entityRespond() {
    if (!entityInput || !entityInput.value.trim()) return;

    registerMessageAndCheckSpam();

    const userText = entityInput.value;
    const reply = resolveEntityReply(userText);

    entityMessage.style.opacity = '0';
    setTimeout(() => {
        entityMessage.innerText = reply;
        entityMessage.style.opacity = '1';
    }, 250);
    entityInput.value = '';
}

if (entitySend) entitySend.addEventListener('click', entityRespond);
if (entityInput) {
    entityInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') entityRespond();
    });
}

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