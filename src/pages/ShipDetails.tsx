import { useParams } from 'react-router-dom';
import { useFetchMultipleUrls } from '../hooks/multipleUrlsHooks';
import { useFetchByUrl } from '../hooks/databyUrlHooks';
import { useShipDetails } from '../hooks/shipHooks';

function ShipDetails() {
  const { shipId } = useParams<{ shipId?: string }>();
  const { data: ShipDetails, isLoading, isError, error } = useShipDetails(shipId!);
  const films = useFetchMultipleUrls(ShipDetails?.films || []);
  const { data: pilotNames } = useFetchByUrl(ShipDetails?.pilots || []);


  if (isLoading) return <div className="text-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (isError) return <div>Error: {error instanceof Error ? error.message : 'An error occured'}</div>;
  if (!ShipDetails) return <div>Ship not found.</div>;

  return (
    <div className='container'>
      <h2 className='space'>Ship Details</h2>
      <div className='row'>
        <div className='col-12 col-md-6'>
          <p><strong>Name:</strong> {ShipDetails.name || 'None'}</p>
          <p><strong>Model:</strong> {ShipDetails.model || 'None'}</p>
          <p><strong>Manufacturer:</strong> {ShipDetails.manufacturer || 'None'}</p>
          <p><strong>Cost in Credits:</strong> {ShipDetails.cost_in_credits || 'None'}</p>
          <p><strong>Length:</strong> {ShipDetails.length || 'None'}</p>
          <p><strong>Crew:</strong> {ShipDetails.crew || 'None'}</p>
          <p><strong>Passengers:</strong> {ShipDetails.passengers || 'None'}</p>
          <p><strong>Max Atmosphering Speed:</strong> {ShipDetails.max_atmosphering_speed || 'None'}</p>
          <p><strong>Hyperdrive Rating:</strong> {ShipDetails.hyperdrive_rating || 'None'}</p>
          <p><strong>MGLT:</strong> {ShipDetails.MGLT || 'None'}</p>
        </div>
        <div className='col-12 col-md-6'>
          <p><strong>Cargo Capacity:</strong> {ShipDetails.cargo_capacity || 'None'}</p>
          <p><strong>Consumables:</strong> {ShipDetails.consumables || 'None'}</p>
          <p>
            <strong>Films:</strong>
            {films.data && films.data.length > 0 ? (
              films.data.map((film, index) => <p key={index}>{film.title}</p>)
            ) : (
              <p>None</p>
            )}
          </p>
          <p><strong>Pilots:</strong> {pilotNames?.name || 'None'}</p>
          <p><strong>URL:</strong> {ShipDetails.url || 'None'}</p>
          <p><strong>Created:</strong> {ShipDetails.created || 'None'}</p>
          <p><strong>Edited:</strong> {ShipDetails.edited || 'None'}</p>
        </div>
      </div>
    </div>
  );
}
export default ShipDetails;