import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePeople } from '../hooks/swapiHooks';

const extractIdFromUrl = (url: string): string | null => {
  const idPattern = /\/(\d+)\/$/; // Regex to match the ID at the end of the URL
  const match = url.match(idPattern);
  return match ? match[1] : null;
};

const PeopleList = () => {
  const { data: people, isLoading, error } = usePeople();
  const [filter, setFilter] = useState('');

  if (isLoading) return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>);
  if (error) return <div>Error: {error.message}</div>;

  const filteredPeople = people?.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase()) ||
    person.gender.toLowerCase().includes(filter.toLowerCase())
  ).slice(0, 20);

  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className="container-fluid centered2">
          <input className='form-control me-2' type="text" placeholder="Filter by name and gender..." value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
      </nav>
      <ul className='paddingLeft'>
        {filteredPeople?.map((person, index) => (
          <li key={index}><Link to={`/people/${extractIdFromUrl(person.url)}`}>{person.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleList;