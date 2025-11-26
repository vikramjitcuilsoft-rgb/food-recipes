import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export function useRandomMeals(count: number = 10) { // default 10 now
  return useQuery<Meal[], Error>({
    queryKey: ['randomMeals', count],
    queryFn: async () => {
      const meals: Meal[] = [];
      for (let i = 0; i < count; i++) {
        const res = await axios.get(`${API_BASE}/random.php`);
        if (res.data.meals) {
          meals.push(res.data.meals[0]);
        }
      }
      return meals; 
    },
  });
}
