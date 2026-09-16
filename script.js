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

            // Formas variadas: círculos y corazones
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
const birthDate = new Date('1978-9-17');
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
