'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const { data: meals = [], isLoading, error } = useQuery<Meal[], Error>({
    queryKey: ['searchMeals', query],
    queryFn: async () => {
      if (!query) return [];
      const res = await axios.get(`${API_BASE}/search.php?s=${query}`);
      return res.data.meals ?? [];
    },
    enabled: !!query,
  });

  // Helper to render skeletons
  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="border rounded p-4 animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
    ));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {error && <p className="text-red-500 mb-4">Error fetching meals.</p>}
      {!isLoading && meals.length === 0 && <p>No meals found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? renderSkeletons(6)
          : meals.map((meal) => (
              <Link href={`/meal/${meal.idMeal}`} key={meal.idMeal} className="block">
                <div className="border rounded p-4 hover:shadow-lg transition-shadow">
                  <img 
                    src={meal.strMealThumb} 
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold">{meal.strMeal}</h3>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="border rounded p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

