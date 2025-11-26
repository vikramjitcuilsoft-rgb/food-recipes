"use client";

import Link from "next/link";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="border rounded-lg p-3 shadow hover:shadow-lg transition">
      <img
        src={recipe.strMealThumb}
        className="rounded-lg w-full h-48 object-cover"
        alt={recipe.strMeal}
      />

      <h2 className="text-xl font-bold mt-3">{recipe.strMeal}</h2>
      <p className="text-gray-600">{recipe.strCategory}</p>

      <Link
        href={`/recipes/${recipe.idMeal}`}
        className="block mt-3 text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}
