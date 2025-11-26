import axios from "axios";

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
}

export const getRecipes = async (): Promise<Recipe[]> => {
  const res = await axios.get(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  return res.data.meals || [];
};
