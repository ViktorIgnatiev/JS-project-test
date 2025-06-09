// import Swiper from 'swiper/bundle';
// import 'swiper/css/bundle';
// import { Rating } from 'css-star-rating';
// import 'css-star-rating/css/star-rating.css';

// export function renderFeedback(container, feedbacks) {
//   container.innerHTML = `
//     <section class="feedback" id="feedback">
//       <div class="container">
//         <h2 class="section-title">Customer Reviews</h2>
        
//         <div class="feedback-slider swiper">
//           <div class="swiper-wrapper">
//             ${feedbacks.map(feedback => `
//               <div class="swiper-slide">
//                 <div class="feedback-card">
//                   <div class="feedback-rating" 
//                        data-rating="${Math.round(feedback.rating)}"
//                        id="rating-${feedback.id}"></div>
//                   <p class="feedback-text">"${feedback.text}"</p>
//                   <p class="feedback-author">${feedback.author}</p>
//                 </div>
//               </div>
//             `).join('')}
//           </div>
          
//           <div class="swiper-button-prev"></div>
//           <div class="swiper-button-next"></div>
//           <div class="swiper-pagination"></div>
//         </div>
//       </div>
//     </section>
//   `;

//   // Initialize star ratings
//   feedbacks.forEach(feedback => {
//     const ratingElement = document.getElementById(`rating-${feedback.id}`);
//     const rating = new Rating(ratingElement);
//     rating.setRating(Math.round(feedback.rating));
    
//     // Додаткові налаштування
//     rating.setOptions({
//       size: 'large',
//       starType: 'star-icon',
//       theme: 'default',
//       disabled: true, // Якщо рейтинг тільки для перегляду
//       showText: false // Приховати текст
//     });
//   });

//   // Initialize Swiper
//   const swiper = new Swiper('.feedback-slider', {
//     loop: true,
//     slidesPerView: 1,
//     spaceBetween: 30,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//       el: '.swiper-pagination',
//       type: 'custom',
//       renderCustom: function (swiper, current, total) {
//         return `
//           <span class="${current === 1 ? 'active' : ''}"></span>
//           <span class="${current > 1 && current < total ? 'active' : ''}"></span>
//           <span class="${current === total ? 'active' : ''}"></span>
//         `;
//       }
//     },
//     breakpoints: {
//       768: {
//         slidesPerView: 2,
//       },
//       1024: {
//         slidesPerView: 3,
//       }
//     }
//   });
// }




// //   Не потрібне 

// export function renderHeader(container) {
//     container.innerHTML = `
//       <header class="header">
//         <div class="container">
//           <a href="/" class="logo">
//             <img src="./assets/images/logo.svg" alt="Artists Hub Logo">
//           </a>
//           <nav class="nav">
//             <ul class="nav-list">
//               <li><a href="#artists">Artists</a></li>
//               <li><a href="#about">About</a></li>
//               <li><a href="#feedback">Feedback</a></li>
//             </ul>
//           </nav>
//           <button class="burger-menu" aria-label="Toggle menu">
//             <span></span>
//             <span></span>
//             <span></span>
//           </button>
//         </div>
//       </header>
//     `;
//   }
  
//   export function renderHero(container) {
//     container.innerHTML = `
//       <section class="hero">
//         <div class="container">
//           <h1 class="hero-title">Discover Amazing Artists</h1>
//           <p class="hero-subtitle">Find your next favorite musician</p>
//           <a href="#artists" class="btn btn-primary">Explore Artists</a>
//         </div>
//       </section>
//     `;
//   }
  
//   export function renderArtists(container, artists) {
//     container.innerHTML = `
//       <section class="artists" id="artists">
//         <div class="container">
//           <h2 class="section-title">Artists</h2>
//           <p class="section-subtitle">Explore Your New Favorite Artists</p>
          
//           <div class="artists-grid">
//             ${artists.map(artist => `
//               <div class="artist-card" data-id="${artist.id}">
//                 <img src="${artist.image}" alt="${artist.name}" class="artist-image">
//                 <div class="artist-info">
//                   <h3 class="artist-name">${artist.name}</h3>
//                   <p class="artist-genres">${artist.genres.join(', ')}</p>
//                   <p class="artist-bio">${artist.shortBio}</p>
//                   <button class="btn btn-secondary learn-more">Learn More</button>
//                 </div>
//               </div>
//             `).join('')}
//           </div>
          
//           <button class="btn btn-primary load-more">Load More</button>
//         </div>
//       </section>
//     `;
//   }
  


