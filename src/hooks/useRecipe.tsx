import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Root {
  status: string;
  data: Data;
}

export interface Data {
  recipe: Recipe;
}

export interface Recipe {
  publisher: string;
  ingredients: Ingredient[];
  source_url: string;
  image_url: string;
  title: string;
  servings: number;
  cooking_time: number;
  id: string;
}

export interface Ingredient {
  quantity?: number;
  unit: string;
  description: string;
}

const recipeId = "/5ed6604691c37cdc054bd007";

export const useRecipe = useQuery<Recipe, Error>({
  queryKey: ["recipe"],
  queryFn: () =>
    apiClient.get<Root>(recipeId).then((res) => res.data.data.recipe),
  staleTime: 1 * 60 * 1000, //1min
});

// export default useRecipe;
