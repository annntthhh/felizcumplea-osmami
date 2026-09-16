// ===== SOPLAR LAS VELAS =====
const cake = document.getElementById('cake');
const blowBtn = document.getElementById('blowBtn');
const message = document.getElementById('message');

blowBtn.addEventListener('click', () => {
    cake.classList.add('out'); // apaga las velas
    blowBtn.style.display = 'none'; // oculta el botón
    message.classList.remove('hidden'); // muestra el mensaje
    launchConfetti(); // 🎉 celebración
});

// ===== CONFETI =====
function launchConfetti() {
    const colors = ['#ff8fa3', '#800020', '#ffc0cb', '#ffd700', '#fff'];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const piece = document.createElement('div');
            piece.className = 'confetti';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = (3 + Math.random() * 2) + 's';
            piece.style.width = (6 + Math.random() * 8) + 'px';
            piece.style.height = piece.style.width;
            document.body.appendChild(piece);

            // limpiar después
            setTimeout(() => piece.remove(), 5000);
        }, i * 40);
    }
}

// ===== CONTADOR DE EDAD =====
// Fecha del cumpleaños (cámbiala por la fecha real de tu mamá)
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
