function createCalendar() {
    const calendar = document.getElementById('weddingCalendar');
    const weddingDate = new Date(2026, 6, 17); // Июль 2026 (месяцы 0-11)
    

    calendar.innerHTML = '';
    
    const calendarHTML = `
        <div class="calendar-header">
            <h3 class="calendar-month">${getMonthName(weddingDate.getMonth())}</h3>
            <p class="calendar-year">${weddingDate.getFullYear()}</p>
        </div>
        <div class="weekdays">
            <span>Пн</span><span>Вт</span><span>Ср</span><span>Чт</span><span>Пт</span><span>Сб</span><span>Вс</span>
        </div>
        <div class="days" id="calendarDays"></div>
    `;
    
    calendar.innerHTML = calendarHTML;
    

    fillCalendarDays(weddingDate);
}

function getMonthName(monthIndex) {
    const months = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return months[monthIndex];
}

function fillCalendarDays(weddingDate) {
    const daysContainer = document.getElementById('calendarDays');
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth();
    
 
    const firstDay = new Date(year, month, 1);

    const lastDay = new Date(year, month + 1, 0);
    
 
    let firstDayOfWeek = firstDay.getDay();
 
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        daysContainer.appendChild(emptyDay);
    }
    
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        
        if (day === weddingDate.getDate()) {
            dayElement.classList.add('wedding-day');
        }
        
        daysContainer.appendChild(dayElement);
    }
}

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}


function initAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-btn');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            accordionButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    otherBtn.classList.remove('active');
                    const otherContent = otherBtn.nextElementSibling;
                    otherContent.style.maxHeight = null;
                }
            });
            
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.appearing-text');
    
    function checkVisibility() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
}

document.addEventListener('DOMContentLoaded', function() {
    createCalendar();
    initAccordion();
    window.addEventListener('resize', function() {
    });
    initScrollAnimations();
});


