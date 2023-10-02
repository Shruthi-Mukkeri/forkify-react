import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import styles from "./RecipeDetaila.module.css";

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

const RecipeDetails = () => {
  const recipeId = "/5ed6604691c37cdc054bd007";

  const { data, error } = useQuery<Recipe, Error>({
    queryKey: ["recipe"],
    queryFn: () =>
      apiClient.get<Root>(recipeId).then((res) => res.data.data.recipe),
    staleTime: 1 * 60 * 1000, //1min
  });
  return (
    <div>
      <p>{error?.message}</p>
      <a href="#" className={`nav-link text-uppercase border`}>
        <div className="d-flex align-items-center p-2">
          <img
            className={`${styles["previewImage"]} rounded-circle object-fit-cover`}
            src={data?.image_url}
            alt={data?.title}
          />
          <div className="ps-3">
            <p className={`${styles["previewTitle"]}  mb-1 `}>{data?.title}</p>
            <p className={`mb-1 ${styles["previewPublisher"]}`}>
              {data?.publisher}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default RecipeDetails;
