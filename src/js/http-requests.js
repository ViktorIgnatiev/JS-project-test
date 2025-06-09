// import { showLoader, hideLoader } from './loader';

// const BASE_URL = 'https://sound-wave.b.goit.study/api';

// export async function fetchArtists() {
//   try {
//     showLoader();
//     const response = await axios.get(`${BASE_URL}/artists`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching artists:', error);
//     throw error;
//   } finally {
//     hideLoader();
//   }
// }

// export async function fetchArtistDetails(artistId) {
//   try {
//     showLoader();
//     const response = await axios.get(`${BASE_URL}/artists/${artistId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching artist details:', error);
//     throw error;
//   } finally {
//     hideLoader();
//   }
// }


// // ! FEEDBACK FUNCTION API 
// export async function fetchFeedbacks() {
//     try {
//       showLoader();
//       const response = await axios.get(`${BASE_URL}/feedbacks`);
//       return response.data.map(feedback => ({
//         ...feedback,
//         rating: Math.round(feedback.rating) // Округлюємо рейтинг
//       }));
//     } catch (error) {
//       console.error('Error fetching feedbacks:', error);
//       throw error;
//     } finally {
//       hideLoader();
//     }
//   }