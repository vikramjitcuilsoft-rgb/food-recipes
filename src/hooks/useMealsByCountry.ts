// hooks/useMealsByCountry.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function useMealsByCountry(country: string | null) {
  return useQuery<Meal[], Error>({
    queryKey: ['mealsByCountry', country],
    queryFn: async () => {
      if (!country) return [];
      const res = await axios.get(`${API_BASE}/filter.php?a=${country}`);
      return res.data.meals ?? [];
    },
    enabled: !!country, // only fetch when country is selected
  });
}
