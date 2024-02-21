import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { useShipDetails } from '../hooks/swapiHooks';


interface PersonDetails {
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
  url: string;
  created: string;
  edited: string;
}

function PersonDetails() {
  const { personId } = useParams<{ personId: string }>();
  const [personDetails, setPersonDetails] = useState<PersonDetails | null>(null);
  const [homeworldName, setHomeworldName] = useState<string | null>(null);
  const [speciesNames, setSpeciesNames] = useState<string[]>([]);
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [starshipNames, setStarShipNames] = useState<string[]>([]);
  const [vehiclesNames, setVehiclesNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {

        const response = await axios.get<PersonDetails>(`https://swapi.dev/api/people/${personId}/`);
        setPersonDetails(response.data);

        const homeworldResponse = await axios.get(response.data.homeworld);
        setHomeworldName(homeworldResponse.data.name);

        if (response.data.species.length > 0) {
          const speciesResponses = await Promise.all(
            response.data.species.map(speciesUrl => axios.get(speciesUrl))
          );
          const speciesNames = speciesResponses.map(res => res.data.name);
          setSpeciesNames(speciesNames);
        }

        if (response.data.films.length > 0) {
          const filmResponses = await Promise.all(
            response.data.films.map(filmUrl => axios.get(filmUrl))
          );
          const filmTitles = filmResponses.map(res => res.data.title);
          setFilmTitles(filmTitles);
        }

        if (response.data.starships.length > 0) {
          const starshipResponses = await Promise.all(
            response.data.starships.map(starshipUrl => axios.get(starshipUrl))
          );
          const starshipNames = starshipResponses.map(res => res.data.name);
          setStarShipNames(starshipNames);
        }

        if (response.data.vehicles.length > 0) {
          const vehiclesResponses = await Promise.all(
            response.data.vehicles.map(vehiclesUrl => axios.get(vehiclesUrl))
          );
          const vehiclesNames = vehiclesResponses.map(res => res.data.name);
          setVehiclesNames(vehiclesNames);
        }

      } catch (err) {
        console.error(err);
        setError('Person not found.');
      } finally {
        setLoading(false);
      }
    };

    if (personId) {
      fetchPersonDetails();
    }
  }, [personId]);

  if (loading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>

  if (error) return <div>Error: {error}</div>;
  if (!personDetails) return <div>Person not found.</div>;

  return (
    <div className='container'>
      <h2 className='space'>Person Details</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <p><strong>Name:</strong> {personDetails.name}</p>
          <p><strong>Birthday:</strong> {personDetails.birth_year}</p>
          <p><strong>Eye Color:</strong> {personDetails.eye_color}</p>
          <p><strong>Gender:</strong> {personDetails.gender}</p>
          <p><strong>Hair Color:</strong> {personDetails.hair_color}</p>
          <p><strong>Height:</strong> {personDetails.height}</p>
          <p><strong>Mass:</strong> {personDetails.mass}</p>
          <p><strong>Skin Color:</strong> {personDetails.skin_color}</p>
          <p><strong>Homeworld:</strong> {homeworldName}</p>
        </div>
        <div className='col-12 col-md-6'>
          {speciesNames.length > 0 ? (
            <p><strong>Species:</strong> {speciesNames.join(', ')}</p>
          ) : (
            <p><strong>Species:</strong> Unknown</p>
          )}
          <strong>Films:</strong>
          {filmTitles.length > 0 ? (
            filmTitles.map((title, index) => <p key={index}>{title}</p>)
          ) : (
            <p>None</p>
          )}
          <strong>Starships:</strong>
          {starshipNames.length > 0 ? (
            starshipNames.map((name, index) => <p key={index}>{name}</p>)
          ) : (
            <p>None</p>
          )}
          <strong>Vehicles:</strong>
          {vehiclesNames.length > 0 ? (
            vehiclesNames.map((name, index) => <p key={index}>{name}</p>)
          ) : (
            <p>None</p>
          )}
          <p><strong>URL:</strong> {personDetails.url}</p>
          <p><strong>Created:</strong> {personDetails.created}</p>
          <p><strong>Edited:</strong> {personDetails.edited}</p>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;