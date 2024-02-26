import { useQuery } from '@tanstack/react-query';
import { fetchDataByUrl } from '../services/dataByUrlService.ts'; 

export const useFetchByUrl = (url: string) => {
  return useQuery({
    queryKey: ['fetchData', url], 
    queryFn: () => fetchDataByUrl(url),
    enabled: !!url, 
  });
};
