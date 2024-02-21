import axios from 'axios';

const fetchFirstTwoPages = async (url: string): Promise<any[]> => {
  const page1 = axios.get(`${url}?page=1`);
  const page2 = axios.get(`${url}?page=2`);
  const responses = await Promise.all([page1, page2]);
  const combinedResults = responses.flatMap(response => response.data.results);
  return combinedResults;
};

export const fetchPersonId = async (id: string) =>
{
  const response = await axios.get(`https://swapi.dev/api/people/${id}`);
  return response.data;
}

export const fetchShipId = async (id: string) =>
{
  const response = await axios.get(`https://swapi.dev/api/starships/${id}`);
  return response.data;
}

export const fetchPeople = () => fetchFirstTwoPages('https://swapi.dev/api/people/');
export const fetchShips = () => fetchFirstTwoPages('https://swapi.dev/api/starships/');
