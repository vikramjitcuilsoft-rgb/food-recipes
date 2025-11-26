import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function usePopularMeals() {
  return useQuery<Meal[], Error>({
    queryKey: ['popularMeals'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/filter.php?c=Beef`); // You can choose another category
      return (res.data.meals ?? []).slice(0, 6); // top 5 meals
    },
  });
}
