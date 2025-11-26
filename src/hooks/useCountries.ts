import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Country {
  strArea: string;
}

export function useCountries() {
  return useQuery<Country[], Error>({
    queryKey: ['countries'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/list.php?a=list`);
      return res.data.meals ?? []; // return empty array if null
    },
  });
}
