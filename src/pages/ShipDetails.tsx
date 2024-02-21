import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import { useShipDetails } from '../hooks/swapiHooks';


interface ShipDetails {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
  url: string;
  created: string;
  edited: string;
}

function ShipDetails() {
  const { shipId } = useParams<{ shipId: string }>();
  const [ShipDetails, setShipDetails] = useState<ShipDetails | null>(null);
  const [filmTitles, setFilmTitles] = useState<string[]>([]);
  const [pilotNames, setPilotsNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShipDetails = async () => {
      try {
        const response = await axios.get<ShipDetails>(`https://swapi.dev/api/starships/${shipId}/`);
        setShipDetails(response.data);

        if (response.data.films.length > 0) {
          const filmResponses = await Promise.all(
            response.data.films.map(filmUrl => axios.get(filmUrl))
          );
          const filmTitles = filmResponses.map(res => res.data.title);
          setFilmTitles(filmTitles);
        }

        if (response.data.pilots.length > 0) {
          const pilotResponses = await Promise.all(
            response.data.pilots.map(personUrl => axios.get(personUrl))
          );
          const pilotsNames = pilotResponses.map(res => res.data.name);
          setPilotsNames(pilotsNames);
        }

      } catch (err) {
        console.error(err);
        setError('Ship not found');
      } finally {
        setLoading(false);
      }
    };

    if (shipId) {
      fetchShipDetails();
    }

  }, [shipId]);

  if (loading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <div>Error: {error}</div>;
  if (!ShipDetails) return <div>Ship not found.</div>;

  return (
    <div className='container'>
      <h2 className='space'>Ship Details</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <p><strong>Name:</strong> {ShipDetails.name}</p>
          <p><strong>Model:</strong> {ShipDetails.model}</p>
          <p><strong>Manufacturer:</strong> {ShipDetails.manufacturer}</p>
          <p><strong>Cost in Credits:</strong> {ShipDetails.cost_in_credits}</p>
          <p><strong>Length:</strong> {ShipDetails.length}</p>
          <p><strong>Crew:</strong> {ShipDetails.crew}</p>
          <p><strong>Passengers:</strong> {ShipDetails.passengers}</p>
          <p><strong>Max Atmosphering Speed:</strong> {ShipDetails.max_atmosphering_speed}</p>
          <p><strong>Hyperdrive Rating:</strong> {ShipDetails.hyperdrive_rating}</p>
          <p><strong>MGLT:</strong> {ShipDetails.MGLT}</p>
        </div>
        <div className='col-12 col-md-6'>
          <p><strong>Cargo Capacity:</strong> {ShipDetails.cargo_capacity}</p>
          <p><strong>Consumables:</strong> {ShipDetails.consumables}</p>
          <p>
            <strong>Films:</strong>
            {filmTitles.length > 0 ? (
              filmTitles.map((title, index) => <p key={index}>{title}</p>)
            ) : (
              <p>None</p>
            )}
          </p>
          <p>
            <strong>Pilots:</strong>
            {pilotNames.length > 0 ? (
              pilotNames.map((title, index) => <p key={index}>{title}</p>)
            ) : (
              <p>None</p>
            )}
          </p>
          <p><strong>URL:</strong> {ShipDetails.url}</p>
          <p><strong>Created</strong> {ShipDetails.created}</p>
          <p><strong>Edited</strong> {ShipDetails.edited}</p>
        </div>
      </div>
    </div>
      );
}
export default ShipDetails;