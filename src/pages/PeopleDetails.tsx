import { useParams } from 'react-router-dom';
import { useFetchMultipleUrls } from '../hooks/multipleUrlsHooks.ts';
import { useFetchByUrl } from '../hooks/databyUrlHooks.ts';
import { usePersonDetails } from '../hooks/personHooks.ts';

function PersonDetails() {
  const { personId } = useParams<{ personId?: string }>();
  const { data: personDetails, isLoading, isError, error } = usePersonDetails(personId!);
  const { data: homeworld } = useFetchByUrl(personDetails?.homeworld || '');
  const films = useFetchMultipleUrls(personDetails?.films || []);
  const species = useFetchMultipleUrls(personDetails?.species || []);
  const starships = useFetchMultipleUrls(personDetails?.starships || []);
  const vehicles = useFetchMultipleUrls(personDetails?.vehicles || []);

  if (isLoading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
  if (!personDetails) return <div>Person not found.</div>;

  return (
    <div className='container'>
      <h2 className='space'>Person Details</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <p><strong>Name:</strong> {personDetails.name || 'None'}</p>
          <p><strong>Birthday:</strong> {personDetails.birth_year || 'None'}</p>
          <p><strong>Eye Color:</strong> {personDetails.eye_color || 'None'}</p>
          <p><strong>Gender:</strong> {personDetails.gender || 'None'}</p>
          <p><strong>Hair Color:</strong> {personDetails.hair_color || 'None'}</p>
          <p><strong>Height:</strong> {personDetails.height || 'None'}</p>
          <p><strong>Mass:</strong> {personDetails.mass || 'None'}</p>
          <p><strong>Skin Color:</strong> {personDetails.skin_color || 'None'}</p>
          <p><strong>Homeworld:</strong> {homeworld?.name || 'None'}</p>
          <p><strong>Films:</strong>
            {films.data && films.data.length > 0 ? (
              films.data.map((film, index) => <p key={index}>{film.title}</p>)
            ) : (
              <p>None</p>
            )}</p>
        </div>
        <div className="col-12 col-md-6">
          <p> <strong>Species:</strong>
            {species?.data && species.data.length > 0 ? (
              species?.data.map((specie, index) => <p key={index}>{specie.name}</p>)
            ) : (
              <p>None</p>
            )}</p>
          <p> <strong>Starships:</strong>
            {starships?.data && starships.data.length > 0 ? (
              starships?.data.map((starship, index) => <p key={index}>{starship.name}</p>)
            ) : (
              <p>None</p>
            )}</p>
          <p><strong>Vehicles:</strong>
            {vehicles?.data && vehicles.data.length > 0 ? (
              vehicles?.data.map((vehicle, index) => <p key={index}>{vehicle.name}</p>)
            ) : (
              <p>None</p>
            )}</p>
          <p><strong>URL:</strong> {personDetails.url || 'None'}</p>
          <p><strong>Created:</strong> {personDetails.created || 'None'}</p>
          <p><strong>Edited:</strong> {personDetails.edited || 'None'}</p>
        </div>
      </div>
    </div>
  );
}
export default PersonDetails;