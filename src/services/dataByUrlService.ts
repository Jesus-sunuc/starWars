import axios from 'axios';

export const fetchDataByUrl = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
