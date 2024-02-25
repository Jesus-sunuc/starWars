import { useQuery } from '@tanstack/react-query';
import { fetchPeople, fetchShips, fetchPersonId, fetchShipId, fetchDataByUrl, fetchMultipleUrls } from '../services/swapiService.ts';

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

export const useShipDetails = (id: string) => {
  return useQuery({
    queryKey: ['ship'],
    queryFn: () => fetchShipId(id),
  })
}

export const usePersonDetails = (id: string) => {
  return useQuery({
    queryKey: ['person'],
    queryFn: () => fetchPersonId(id),
  });
};

export const useFetchByUrl = (url: string) => {
  return useQuery({
    queryKey: ['fetchData', url], // Ensure unique query keys, especially for dynamic URLs
    queryFn: () => fetchDataByUrl(url),
    enabled: !!url, // Only fetch when a URL is provided
  });
};

export const useFetchMultipleUrls = (urls: string[]) => {
  return useQuery({
    queryKey: ['fetchMultiple', urls.join(',')], // Unique key based on URLs
    queryFn: () => fetchMultipleUrls(urls),
    enabled: urls.length > 0, // Only run if there are URLs to fetch
  });
};
