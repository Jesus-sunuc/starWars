import axios from 'axios';

export const fetchMultipleUrls = async (urls: string[]): Promise<any[]> => {
  const promises = urls.map(url => axios.get(url).then(response => response.data));
  return Promise.all(promises);
};

