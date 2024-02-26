import { useQuery } from '@tanstack/react-query';
import { fetchPersonId } from '../services/personService.ts';

export const usePersonDetails = (id: string) => {
  return useQuery({
    queryKey: ['person'],
    queryFn: () => fetchPersonId(id),
  });
};
