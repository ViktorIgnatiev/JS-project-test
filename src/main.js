const wrapper = document.getElementById('feedback-wrapper');
const paginationContainer = document.getElementById('pagination');
let swiperInstance;

async function fetchFeedbacks() {
    try {
        wrapper.innerHTML = '<div class="swiper-slide loading">Завантаження відгуків...</div>';
        const response = await axios.get('https://sound-wave.b.goit.study/api/feedbacks', {
            params: {
                limit: 3, // Запит на 3 відгуки
                page: 1
            }
        });
        let feedbacks = response.data.data;
            console.log(feedbacks);
            
        if (feedbacks && feedbacks.length > 3) {
            feedbacks = feedbacks.slice(0, 3);
        }
 
        if (!feedbacks || feedbacks.length === 0) {
            "No feedback find"
        }
        
        while (feedbacks.length < 3) {
             feedbacks.push({ name: `Користувач ${feedbacks.length + 1}`, descr: 'Наразі немає додаткових відгуків для відображення.', rating: 3 });
        }


        renderFeedbacks(feedbacks);
        initSwiper();
        initPaginationControls(); 

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

//  генерації зірочок 
function generateStarRating(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="fas fa-star star"></i>'; 
        } else {
            starsHtml += '<i class="fas fa-star star-empty"></i>'; 
        }
    }
    return starsHtml;
}


function initSwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    //  Swiper 
    swiperInstance = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true, 
        autoHeight: true, 
        speed: 700,
        observer: true,
        observeParents: true,
        watchOverflow: true, 
        slidesOffsetBefore: 0, 
        slidesOffsetAfter: 0,  
        on: {
            slideChange: updatePagination,
            init: updatePagination,
        }
    });

    // пагінація
    createPaginationDots(3);
    updatePagination();
}

function createPaginationDots(totalDots) {
    paginationContainer.innerHTML = ''; 

    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('span');
        dot.id = `pag-${i}`;
        dot.addEventListener('click', () => {
            if (swiperInstance) {
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