// === ПЕРЕКЛЮЧЕНИЕ ЭКРАНОВ ЧЕРЕЗ НАВИГАЦИЮ ===
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const screenId = item.getAttribute('data-screen');
        showScreen(screenId);
    });
});

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// === КНОПКИ НАЗАД ===
document.querySelector('.back-btn')?.addEventListener('click', () => {
    goHome();
});

document.querySelector('.format-back')?.addEventListener('click', () => {
    showScreen('screen-maps');
});

function goHome() {
    showScreen('screen-home');
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelector('[data-screen="screen-home"]').classList.add('active');
}

// === ВЫБОР ЗАПИСИ В КАРТАХ ===
let selectedRecordTitle = '';

document.querySelectorAll('.map-card.selectable').forEach(card => {
    card.addEventListener('click', () => {
        selectedRecordTitle = card.getAttribute('data-title');
        document.getElementById('format-title').textContent = selectedRecordTitle;
        showScreen('screen-format');
    });
});

// === ВЫБОР ФОРМАТА — НИЧЕГО НЕ ПРОИСХОДИТ ===
// Убран обработчик клика на format-option

// === ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ МЫШЬЮ ===
const scrollContainer = document.querySelector('.cards-scroll');
if (scrollContainer) {
    let isDown = false;
    let startX;
    let scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        scrollContainer.style.cursor = 'grabbing';
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
        scrollContainer.style.cursor = 'grab';
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainer.scrollLeft = scrollLeft - walk;
    });
}
