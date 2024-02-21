import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePeople } from '../hooks/swapiHooks';

const extractIdFromUrl = (url: string): string | null => {
  const idMatch = url.match(/\/(\d+)\/$/);
  return idMatch ? idMatch[1] : null;
};

const PeopleList = () => {
  const { data: people, isLoading, error } = usePeople();
  const [nameFilter, setNameFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  if (isLoading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <div>Error: {error.message}</div>;

  const filteredPeople = people?.filter(person =>
    person.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    person.gender.toLowerCase().includes(genderFilter.toLowerCase())
  ).slice(0, 20);

  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className="container-fluid centered2">
            <input className='form-control me-2' type="text" placeholder="Filter by name..." value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
            <input className='form-control me-2' type="text" placeholder="Filter by gender..." value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} />
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