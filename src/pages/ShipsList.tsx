import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useShips } from '../hooks/swapiHooks';

const extractIdFromUrl = (url: string) => {
  const idPattern = /\/(\d+)\/$/; // Regex to match the ID at the end of the URL
  const match = url.match(idPattern);
  return match ? match[1] : null;
};

const ShipList = () => {
  const { data: ship, isLoading, error } = useShips();
  const [nameFilter, setNameFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  if (isLoading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredShips = ship?.filter(ship =>
    ship.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    ship.model.toLowerCase().includes(modelFilter.toLowerCase()) // Filtering by model
  ).slice(0, 20);

  return (
    <div>
      <nav className='navbar navbar-expand-lg '>
        <div className="container-fluid centered2">
            <input className='form-control me-2' type="text" placeholder="Filter by name..." value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
            <input className='form-control me-2' type="text" placeholder="Filter by model..." value={modelFilter} onChange={(e) => setModelFilter(e.target.value)} />
        </div>
      </nav>
      <ul className='paddingLeft'>
        {filteredShips?.map((ship) => {
          const shipId = extractIdFromUrl(ship.url); // Extract the ID from the ship's URL
          return (
            <li key={shipId}><Link to={`/starships/${shipId}/`}>{ship.name}</Link></li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShipList;
