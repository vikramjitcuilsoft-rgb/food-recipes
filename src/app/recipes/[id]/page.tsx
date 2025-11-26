"use client";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
}

async function getSingleRecipe(id: string): Promise<Recipe> {
  const res = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  return res.data.meals[0];
}

export default function RecipeDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getSingleRecipe(id),
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <p>Recipe not found.</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{data.strMeal}</h1>
      <img src={data.strMealThumb} className="rounded-lg w-full max-w-md" />

      <p className="mt-4 text-gray-600">
        <strong>Category:</strong> {data.strCategory}
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-2">Instructions</h2>
      <p className="leading-7">{data.strInstructions}</p>
    </div>
  );
}
