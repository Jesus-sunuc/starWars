import { useQuery } from '@tanstack/react-query';
import { fetchPeople, fetchShips} from '../services/pagesService.ts';

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