// import { fetchArtistDetails } from './http-requests.js';
// import { showLoader, hideLoader } from './loader.js';

// export function setupModal() {
//   const modal = document.createElement('div');
//   modal.className = 'modal hidden';
//   modal.innerHTML = `
//     <div class="modal-content">
//       <button class="close-modal">&times;</button>
//       <div class="modal-body" id="modal-body"></div>
//     </div>
//   `;
//   document.body.appendChild(modal);

//   document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('learn-more')) {
//       const artistCard = e.target.closest('.artist-card');
//       const artistId = artistCard.dataset.id;
//       openArtistModal(artistId);
//     }
    
//     if (e.target.classList.contains('close-modal')) {
//       closeModal();
//     }
//   });

//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       closeModal();
//     }
//   });

//   document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//       closeModal();
//     }
//   });
// }

// async function openArtistModal(artistId) {
//   try {
//     showLoader();
//     const artist = await fetchArtistDetails(artistId);
//     renderModalContent(artist);
//   } catch (error) {
//     console.error('Error opening artist modal:', error);
//   } finally {
//     hideLoader();
//   }
// }

// function renderModalContent(artist) {
//   const modal = document.querySelector('.modal');
//   const modalBody = document.getElementById('modal-body');
  
//   modalBody.innerHTML = `
//     <h2>${artist.name}</h2>
//     <img src="${artist.image}" alt="${artist.name}">
//     <!-- More artist details here -->
//   `;
  
//   modal.classList.remove('hidden');
//   document.body.style.overflow = 'hidden';
// }

// function closeModal() {
//   const modal = document.querySelector('.modal');
//   modal.classList.add('hidden');
//   document.body.style.overflow = '';
// }