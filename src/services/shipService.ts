import axios from 'axios';

export const fetchShipId = async (id: string) => {
  const response = await axios.get(`https://swapi.dev/api/starships/${id}`);
  return response.data;
}