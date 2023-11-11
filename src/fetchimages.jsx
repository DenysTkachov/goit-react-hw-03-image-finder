import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '39742873-b30b3450f220389da52a09ee2',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async ({ query, page }) => {
  try {
    const response = await axios.get('', {
      params: {
        q: query,
        page,
      },
    });

    const imageData = response.data;

    if (!imageData || !imageData.hits || !Array.isArray(imageData.hits)) {
      console.error('Ошибка при получении изображений: Данные не корректны');
      return null;
    }

   
    return imageData;
  } catch (error) {
    console.error('Ошибка при получении изображений:', error);
    throw error;
  }
};
