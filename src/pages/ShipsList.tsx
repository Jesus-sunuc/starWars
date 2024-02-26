import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../hooks/pagesHooks.ts';

const extractIdFromUrl = (url: string): string | null => {
  const idPattern = /\/(\d+)\/$/; // Regex to match the ID at the end of the URL
  const match = url.match(idPattern);
  return match ? match[1] : null;
};

const ShipList = () => {
  const { data: ships, isLoading, error } = useShips();
  const [filter, setFilter] = useState('');

  if (isLoading) return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;

  const filteredShips = ships?.filter(ship =>
    ship.name.toLowerCase().includes(filter.toLowerCase()) ||
    ship.model.toLowerCase().includes(filter.toLowerCase())
  ).slice(0, 20);

  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className="container-fluid centered2">
          <input className='form-control me-2' type="text" placeholder="Filter by name or model..." value={filter} onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </nav>
      <ul className='paddingLeft'>
        {filteredShips?.map((ship) => {
          const shipId = extractIdFromUrl(ship.url);
          return (
            <li key={shipId}><Link to={`/starships/${shipId}/`}>{ship.name}</Link></li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShipList;
