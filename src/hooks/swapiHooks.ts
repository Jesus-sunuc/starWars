import { useQuery } from '@tanstack/react-query';
import { fetchPeople, fetchShips, fetchPersonId, fetchShipId} from '../services/swapiService.ts';

export const usePeople = () => {
  return useQuery({
    queryKey: ['people'],
    queryFn: fetchPeople,
  });
};

export const useShips = () => {
  return useQuery({
    queryKey: ['ships'],
    queryFn: fetchShips,
  });
};

export const usePersonDetails = (id: string) => {
  return useQuery({
    queryKey: ['person'],
    queryFn: ()=>fetchPersonId(id),
});
};

export const useShipDetails = (id: string) => {
  return useQuery({
    queryKey: ['ship'],
    queryFn: ()=>fetchShipId(id),
  })
}