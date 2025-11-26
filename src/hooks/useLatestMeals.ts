import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function useLatestMeals() {
  return useQuery<Meal[], Error>({
    queryKey: ['latestMeals'],
    queryFn: async () => {
      // Using search with a common letter to get recent meals
      const res = await axios.get(`${API_BASE}/search.php?s=`);
      // Return first 6 meals or empty array if no meals found
      return res.data.meals?.slice(0, 8) ?? [];
    },
  });
}
