import axios from "axios";

export const fetchPersonId = async (id: string) => {
  const response = await axios.get(`https://swapi.tech/api/people/${id}`);
  return response.data;
};
