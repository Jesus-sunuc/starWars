import { useQuery } from '@tanstack/react-query';
import { fetchMultipleUrls } from '../services/multipleUrlsService.ts';

export const useFetchMultipleUrls = (urls: string[]) => {
  return useQuery({
    queryKey: ['fetchMultiple', urls.join(',')], 
    queryFn: () => fetchMultipleUrls(urls),
    enabled: urls.length > 0,
  });
};
