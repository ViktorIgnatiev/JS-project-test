const wrapper = document.getElementById('feedback-wrapper');
const paginationContainer = document.getElementById('pagination');
let swiperInstance;

async function fetchFeedbacks() {
    try {
        wrapper.innerHTML = '<div class="swiper-slide loading">Завантаження відгуків...</div>';

        // !ВАЖЛИВО: Замініть цей URL на коректний URL API, який повертає 3 відгуки.
        // Або, якщо API може повернути більше, ми візьмемо перші 3.
        const response = await axios.get('https://sound-wave.b.goit.study/api/feedbacks', {
            params: {
                limit: 3, // Запит на 3 відгуки
                page: 1
            }
        });
        let feedbacks = response.data.data;
            console.log(feedbacks);
            

        // Якщо API повертає більше відгуків, ніж 3, беремо лише перші 3.
        if (feedbacks && feedbacks.length > 3) {
            feedbacks = feedbacks.slice(0, 3);
        }

        // Тимчасові дані для тестування, якщо API все ще не працює або повертає мало даних
        if (!feedbacks || feedbacks.length === 0) {
            //  feedbacks = [
            //      { name: 'Емілі Джонсон', descr: "ArtistsHub has transformed the way I discover new music. It's like having a personal DJ that knows my taste perfectly!", rating: 5 },
            //      { name: 'Майк Сміт', descr: "Неймовірно! Цей додаток змінив мій погляд на вибір музики. Я в захваті від рекомендацій.", rating: 4 },
            //      { name: 'Сара Браун', descr: "Просто ідеально! Я завжди знаходжу щось нове та цікаве. Дякую за такий чудовий сервіс.", rating: 5 },
            //  ];
        }
        // Забезпечуємо, що завжди буде 3 відгуки для Swiper
        while (feedbacks.length < 3) {
             feedbacks.push({ name: `Користувач ${feedbacks.length + 1}`, descr: 'Наразі немає додаткових відгуків для відображення.', rating: 3 });
        }


        renderFeedbacks(feedbacks);
        initSwiper();
        initPaginationControls(); // Обробники для кнопок, пагінація буде створюватись в initSwiper

    } catch (err) {
        console.error('Помилка при завантаженні відгуків', err);
        showErrorMessage();
    }
}

function renderFeedbacks(feedbacks) {
    wrapper.innerHTML = '';

    feedbacks.forEach(fb => {
        const roundedRating = Math.round(fb.rating);
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="rating">
                ${generateStarRating(roundedRating)}
            </div>
            <div class="text">"${fb.descr}"</div>
            <div class="user">${fb.name}</div>
        `;
        wrapper.appendChild(slide);
    });
}

// Функція для генерації зірочок Font Awesome
function generateStarRating(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star star"></i>'; // Заповнена зірка
        } else {
            starsHtml += '<i class="far fa-star star-empty"></i>'; // Порожня зірка
        }
    }
    return starsHtml;
}


function initSwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    // Ініціалізуємо Swiper з кількістю слайдів 3
    swiperInstance = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true, // Забезпечує, що активний слайд по центру
        // autoHeight: true, // Додайте це, якщо висота відгуків може сильно відрізнятися
        observer: true,
        observeParents: true,
        watchOverflow: true, // Допомагає Swiper краще адаптуватися до контенту
        // slidesOffsetBefore: 0, // Переконайтеся, що немає зайвих відступів
        // slidesOffsetAfter: 0,  // Переконайтеся, що немає зайвих відступів
        on: {
            slideChange: updatePagination,
            init: updatePagination,
        }
    });

    // Створюємо 3 точки пагінації
    createPaginationDots(3);
    updatePagination();
}

function createPaginationDots(totalDots) {
    paginationContainer.innerHTML = ''; // Очищаємо попередні точки

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.id = `pag-${i}`;
        dot.addEventListener('click', () => {
            if (swiperInstance) {
                // Swiper у режимі loop може мати більше "реальних" слайдів, ніж видно.
                // Використовуємо .slideToLoop для коректного переходу.
                swiperInstance.slideToLoop(i);
            }
        });
        paginationContainer.appendChild(dot);
    }
}


function initPaginationControls() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    });
}

function updatePagination() {
    if (!swiperInstance || swiperInstance.slides.length === 0) {
        return;
    }

    // Swiper у режимі loop має додаткові дубльовані слайди на початку та в кінці.
    // .realIndex дає індекс "справжнього" слайда (0, 1, 2)
    const activeIndex = swiperInstance.realIndex;

    document.querySelectorAll('.pagination span').forEach((span, index) => {
        span.classList.remove('active');
        if (index === activeIndex) {
            span.classList.add('active');
        }
    });
}

function showNoFeedbacksMessage() {
    wrapper.innerHTML = '<div class="swiper-slide">Наразі відгуків немає</div>';
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    paginationContainer.innerHTML = '';
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}

function showErrorMessage() {
    wrapper.innerHTML = '<div class="swiper-slide error-message">Не вдалося завантажити відгуки. Спробуйте пізніше.</div>';
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }
    paginationContainer.innerHTML = '';
    document.getElementById('prevBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
}


document.addEventListener('DOMContentLoaded', fetchFeedbacks);