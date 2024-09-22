const monthYear = document.getElementById('monthYear');
const dates = document.getElementById('dates');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar() {
    currentDate.setDate(1);
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long' }) + ' ' + year;

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    dates.innerHTML = '';

    for (let i = 0; i < firstDay; i++) {
        dates.innerHTML += '<div class="date"></div>'; // Empty divs for days before the first day
    }

    for (let day = 1; day <= lastDate; day++) {
        dates.innerHTML += `<div class="date">${day}</div>`;
    }
}

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initial render
renderCalendar();
