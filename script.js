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

document.querySelector('.result-back')?.addEventListener('click', () => {
    showScreen('screen-format');
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

// === ВЫБОР ФОРМАТА ===
document.querySelectorAll('.format-option').forEach(option => {
    option.addEventListener('click', () => {
        const format = option.getAttribute('data-format');
        showResult(format);
    });
});

function showResult(format) {
    const content = document.getElementById('result-content');
    const title = document.getElementById('result-title');
    title.textContent = selectedRecordTitle;

    if (format === 'table') {
        content.innerHTML = `
            <h3 style="color:#00E5FF;margin-bottom:16px;">📊 Таблица</h3>
            <table class="result-table">
                <tr><th>Время</th><th>Спикер</th><th>Текст</th></tr>
                <tr><td>00:00</td><td>Преподаватель</td><td>Здравствуйте, сегодня квантовая механика</td></tr>
                <tr><td>02:15</td><td>Преподаватель</td><td>Уравнение Шрёдингера — основа теории</td></tr>
                <tr><td>05:30</td><td>Студент</td><td>А как связана волновая функция?</td></tr>
                <tr><td>06:00</td><td>Преподаватель</td><td>Волновая функция описывает состояние системы</td></tr>
                <tr><td>12:45</td><td>Преподаватель</td><td>На следующей лекции — принцип неопределённости</td></tr>
            </table>
        `;
    } else if (format === 'mindmap') {
        content.innerHTML = `
            <h3 style="color:#00E5FF;margin-bottom:16px;">🧠 Ментальная карта</h3>
            <div class="result-mindmap">
                <div class="node center">Квантовая механика</div>
                <div class="node branch" style="top:15%;left:10%;">Уравнение Шрёдингера</div>
                <div class="node branch" style="top:15%;right:10%;">Волновая функция</div>
                <div class="node branch" style="bottom:20%;left:15%;">Принцип неопределённости</div>
                <div class="node branch" style="bottom:20%;right:15%;">Квантовые состояния</div>
                <div class="node branch" style="top:50%;left:5%;">Операторы</div>
                <div class="node branch" style="top:50%;right:5%;">Гамильтониан</div>
            </div>
        `;
    } else if (format === 'text') {
        content.innerHTML = `
            <h3 style="color:#00E5FF;margin-bottom:16px;">📝 Текст</h3>
            <div class="result-text">
                <p><strong>[00:00]</strong> Здравствуйте, сегодня мы начинаем изучение квантовой механики. Это фундаментальная теория, описывающая поведение материи и энергии на микроскопическом уровне.</p>
                <p><strong>[02:15]</strong> Основным уравнением является уравнение Шрёдингера. Оно описывает эволюцию во времени квантового состояния системы.</p>
                <p><strong>[05:30]</strong> <em>Студент:</em> А как связана волновая функция с физическими наблюдаемыми?</p>
                <p><strong>[06:00]</strong> <em>Преподаватель:</em> Отличный вопрос. Волновая функция ψ содержит всю информацию о системе. Модуль в квадрате |ψ|² даёт плотность вероятности найти частицу в данной точке.</p>
                <p><strong>[12:45]</strong> На следующей лекции мы рассмотрим принцип неопределённости Гейзенберга и его следствия.</p>
            </div>
        `;
    }

    showScreen('screen-result');
}

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