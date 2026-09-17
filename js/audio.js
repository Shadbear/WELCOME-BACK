let audioCtx;

function startHorrorAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'sawtooth';
    subOsc.frequency.setValueAtTime(45, audioCtx.currentTime);

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, audioCtx.currentTime);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);

    subOsc.start();
    whiteNoise.start();
}

const startPrompt = document.getElementById('start-prompt');
startPrompt.addEventListener('click', () => {
    startHorrorAudio();
    startPrompt.style.opacity = '0';
    setTimeout(() => startPrompt.remove(), 1000);
});