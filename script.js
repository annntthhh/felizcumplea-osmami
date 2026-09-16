// ===== SOPLAR LAS VELAS =====
const cake = document.getElementById('cake');
const blowBtn = document.getElementById('blowBtn');
const message = document.getElementById('message');

blowBtn.addEventListener('click', () => {
    cake.classList.add('out');
    blowBtn.style.display = 'none';
    message.classList.remove('hidden');
    launchConfetti();
});

// ===== CONFETI (más cantidad y variedad) =====
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
const birthDate = new Date('1978-01-01');
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

// ===== ✨ NUEVO: Carta desplegable =====
const envelope = document.getElementById('envelope');
const letter = document.getElementById('letter');

envelope.addEventListener('click', () => {
    letter.classList.toggle('open');
});

// ===== ✨ NUEVO: Globos =====
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

// ===== ✨ NUEVO: Velas que se apagan con el micrófono =====
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

        // Detectar soplido: pico de volumen
        function checkBlow() {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
            }
            const avg = sum / dataArray.length;

            // Si sopla fuerte (volumen alto), apagar velas
            if (avg > 60 && !cake.classList.contains('out')) {
                cake.classList.add('out');
                blowBtn.style.display = 'none';
                message.classList.remove('hidden');
                launchConfetti();
                stream.getTracks().forEach(track => track.stop());
                if (audioContext) audioContext.close();
                return;
            }
            requestAnimationFrame(checkBlow);
        }

        checkBlow();
    } catch (err) {
        // Si no hay permiso de micrófono, el botón sigue funcionando normal
        console.log('Micrófono no disponible, usando botón');
    }
}

// Pedir permiso del micrófono al tocar el botón
blowBtn.addEventListener('click', () => {
    startMicrophone();
}, { once: false });
