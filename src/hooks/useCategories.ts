'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/categories.php`);
      return res.data.categories ?? [];
    },
  });
}
