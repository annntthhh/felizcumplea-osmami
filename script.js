// ===== Pantalla de inicio con la huella =====
const introScreen = document.getElementById('introScreen');
const introHeart = document.getElementById('introHeart');

introHeart.addEventListener('click', () => {
    // Pedir permiso del micrófono justo al tocar la huellita
    startMicrophone();
    // Empezar la música dulce
    playMusic();

    // Crear el corazón que crece y explota
    const heart = document.createElement('div');
    heart.className = 'heart-grow';
    heart.textContent = '💖';
    document.body.appendChild(heart);

    // Ocultar la pantalla de inicio
    introScreen.classList.add('hidden');

    // Lanzar confeti al explotar
    setTimeout(() => launchConfetti(), 500);

    // Limpiar el corazón después de la animación
    setTimeout(() => heart.remove(), 1300);
});

// ===== SOPLAR LAS VELAS =====
const cake = document.getElementById('cake');
const blowBtn = document.getElementById('blowBtn');
const message = document.getElementById('message');

blowBtn.addEventListener('click', () => {
    cake.classList.add('out');
    blowBtn.style.display = 'none';
    message.classList.remove('hidden');
    launchConfetti();
    playSparkle(); // ✨ sonido de brillitos por el deseo
});

// ===== 🎵 MÚSICA DULCE DE FONDO =====
let audioCtx = null;
let musicPlaying = false;

function playMusic() {
    if (musicPlaying) return;
    musicPlaying = true;

    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // Notas de una melodía suave y tierna (escala de Do mayor)
    const notas = [
        261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 293.66, 261.63,
        261.63, 329.63, 392.00, 523.25, 659.25, 523.25, 392.00, 329.63,
        293.66, 329.63, 392.00, 329.63, 293.66, 261.63
    ];

    let tiempo = audioCtx.currentTime + 0.1;

    notas.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine'; // sonido suave y dulce
        osc.frequency.value = freq;

        // Cada nota dura 0.5 segundos con un fade suave
        gain.gain.setValueAtTime(0.0001, tiempo);
        gain.gain.exponentialRampToValueAtTime(0.15, tiempo + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, tiempo + 0.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(tiempo);
        osc.stop(tiempo + 0.5);

        tiempo += 0.5;
    });
}

// ===== ✨ SONIDO DE BRILLITOS (deseo cumplido) =====
function playSparkle() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const brillitos = [1046.50, 1318.51, 1567.98, 2093.00];
    let tiempo = audioCtx.currentTime + 0.05;

    brillitos.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.0001, tiempo);
        gain.gain.exponentialRampToValueAtTime(0.12, tiempo + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, tiempo + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(tiempo);
        osc.stop(tiempo + 0.3);

        tiempo += 0.12;
    });
}

// ===== CONFETI =====
function launchConfetti() {
    const colors = ['#ff8fa3', '#800020', '#ffc0cb', '#ffd700', '#fff', '#ff6a00', '#e91e63'];

    for (let i = 0; i < 200; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (3 + Math.random() * 3) + 's';
            piece.style.animationDelay = (Math.random() * 2) + 's';

            const size = 6 + Math.random() * 10;
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';

            if (Math.random() > 0.7) {
                piece.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                piece.style.borderRadius = '50% 50% 50% 0';
                piece.style.transform = 'rotate(-45deg)';
            }

            document.body.appendChild(piece);
            setTimeout(() => piece.remove(), 8000);
        }, i * 20);
    }
}

// ===== CONTADOR DE EDAD =====
// ⚠️ CAMBIA ESTA FECHA por la fecha real de nacimiento de tu mamá
const birthDate = new Date('1978-09-17');
const now = new Date();

let years = now.getFullYear() - birthDate.getFullYear();
let months = now.getMonth() - birthDate.getMonth();
let days = now.getDate() - birthDate.getDate();

if (days < 0) {
    months--;
    days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
}
if (months < 0) {
    years--;
    months += 12;
}

document.getElementById('years').textContent = years;
document.getElementById('months').textContent = months;
document.getElementById('days').textContent = days;

// ===== TOCAR EL PASTEL =====
cake.addEventListener('click', () => {
    cake.style.transform = 'scale(1.05)';
    setTimeout(() => cake.style.transform = 'scale(1)', 200);
});

// ===== Carta desplegable =====
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
    letter.classList.toggle('open');
});

// ===== Globos =====
function launchBalloons() {
    const colors = ['#ff8fa3', '#ffc0cb', '#800020', '#fff', '#ff6a00'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = Math.random() * 90 + 'vw';
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = (6 + Math.random() * 5) + 's';
            balloon.style.animationDelay = (Math.random() * 3) + 's';
            document.body.appendChild(balloon);
            setTimeout(() => balloon.remove(), 12000);
        }, i * 400);
    }
}

// Lanzar globos al inicio y cada 8 segundos
launchBalloons();
setInterval(launchBalloons, 8000);

// ===== 😂 Contador de regaños =====
const scoldBtn = document.getElementById('scoldBtn');
const scoldCount = document.getElementById('scoldCount');
const scoldMsg = document.getElementById('scoldMsg');

let regaños = 0;

const regañadas = [
    '¡Y me los gané todos! 😅',
    'Fue por mi bien... supongo 😂',
    'Mamá siempre tiene razón 😇',
    'Este regaño venía con amor 💕',
    '¡La próxima lo hago mejor! (mentira) 🤭',
    'Ese fue por la comida que no comí 🍽️',
    'Regaño clásico de mamá, edición limitada 😂',
    '¡Y todavía me quieres! 🥰',
    'Este me lo gané con honores 🏆',
    'Mamá: 1, Hijos: 0 😂'
];

scoldBtn.addEventListener('click', () => {
    regaños++;
    scoldCount.textContent = regaños;
    const msg = regañadas[Math.floor(Math.random() * regañadas.length)];
    scoldMsg.textContent = msg;
});

// ===== Velas que se apagan con el micrófono =====
let audioContext = null;

async function startMicrophone() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkBlow() {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const avg = sum / dataArray.length;

            if (avg > 60 && !cake.classList.contains('out')) {
                cake.classList.add('out');
                blowBtn.style.display = 'none';
                message.classList.remove('hidden');
                launchConfetti();
                playSparkle(); // ✨ sonido de brillitos
                stream.getTracks().forEach(track => track.stop());
                if (audioContext) audioContext.close();
                return;
            }
            requestAnimationFrame(checkBlow);
        }

        checkBlow();
    } catch (err) {
        console.log('Micrófono no disponible, usando botón');
    }
}
