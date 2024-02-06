import axios from 'axios';

const YOUR_ACCESS_KEY = 'ioZriOsWU9oWlhviofs-eGLaDyRpu8cqmRFLmC9wjfM';

export const fetchImages = async (query, page) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: YOUR_ACCESS_KEY,
        query,
        page,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch images from Unsplash');
  }
};
