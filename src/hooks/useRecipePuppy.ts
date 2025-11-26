// src/hooks/useRecipePuppy.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface Recipe {
  title: string;
  href: string;
  ingredients: string;
  thumbnail: string;
}

export function useRecipes(query: string = '', page: number = 1) {
  return useQuery<Recipe[], Error>({
    queryKey: ['recipes', query, page],
    queryFn: async () => {
      const res = await axios.get('http://www.recipepuppy.com/api/', {
        params: { q: query, p: page },
      });
      return res.data.results ?? [];
    },
  });
}
