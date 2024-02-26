import { useQuery } from '@tanstack/react-query';
import { fetchShipId } from '../services/shipService.ts';

export const useShipDetails = (id: string) => {
  return useQuery({
    queryKey: ['ship'],
    queryFn: () => fetchShipId(id),
  })
}
