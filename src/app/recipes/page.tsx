'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Breadcrumb from '@/src/components/Breadcrumb';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: any; // for ingredients
}

export default function MealPage() {
  const { id } = useParams();

  const { data: meal, isLoading } = useQuery<MealDetail, Error>({
    queryKey: ['meal', id],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
      return res.data.meals[0];
    },
  });

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4 animate-pulse">
        <div className="h-10 w-3/4 bg-gray-300 rounded"></div> {/* Title */}
        <div className="w-full h-64 bg-gray-300 rounded"></div> {/* Image */}
        <div className="h-6 w-1/4 bg-gray-300 rounded"></div> {/* Category */}
        <div className="h-6 w-1/4 bg-gray-300 rounded"></div> {/* Area */}
        <div className="h-6 w-1/2 bg-gray-300 rounded mt-4"></div> {/* Ingredients header */}
        <ul className="ml-6 space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <li key={idx} className="h-4 w-full bg-gray-300 rounded"></li>
          ))}
        </ul>
        <div className="h-6 w-1/2 bg-gray-300 rounded mt-4"></div> {/* Instructions header */}
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <p key={idx} className="h-4 w-full bg-gray-300 rounded"></p>
          ))}
        </div>
        <div className="h-6 w-1/4 bg-gray-300 rounded mt-4"></div> {/* YouTube link */}
      </div>
    );
  }

  if (!meal) return <p className="text-center mt-8">Meal not found</p>;

  // Collect ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb />

      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p><strong>Category:</strong> {meal.strCategory}</p>
      <p><strong>Area:</strong> {meal.strArea}</p>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Ingredients:</h2>
      <ul className="list-disc ml-6">
        {ingredients.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions:</h2>
      <p>{meal.strInstructions}</p>

      {meal.strYoutube && (
        <div className="mt-4">
          <a
            href={meal.strYoutube}
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Watch on YouTube
          </a>
        </div>
      )}
    </div>
  );
}
