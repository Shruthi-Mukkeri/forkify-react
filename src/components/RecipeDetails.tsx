import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import styles from "./RecipeDetails.module.css";
import { FiUsers } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { BsArrowRightShort, BsBookmark, BsCheck2 } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useState } from "react";
// import "../index.css";

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
  const recipeId = "/5ed6604591c37cdc054bcb37";
  // "/5ed6604691c37cdc054bd007"
  const { data, error } = useQuery<Recipe, Error>({
    queryKey: ["recipe"],
    queryFn: () =>
      apiClient.get<Root>(recipeId).then((res) => res.data.data.recipe),
    staleTime: 1 * 60 * 1000, //1min
  });
  //TODO: how to define dynamic serving number
  const [servingNo, SetServingNo] = useState<number>(4);

  if (error) return <p>{error?.message}</p>;
  return (
    <div className={`${styles["recipeDetailContent"]}`}>
      <section className={`${styles["heroContent"]}`}>
        <img
          className={`${styles["recipeImage"]} w-100 object-fit-cover`}
          src={data?.image_url}
          alt={data?.title}
        />
        <h1 className={`${styles["recipeTitle"]} text-white`}>
          <span>{data?.title}</span>
        </h1>
      </section>
      <div>
        <section className="d-flex justify-content-between align-items-center my-4 py-4 pt-5 pe-2 pe-sm-0  mx-sm-5">
          <div className="d-flex justify-content-around justify-content-sm-start   flex-grow-1 flex-grow-sm-0 ">
            <div
              className={`${styles["recipePublisher"]} d-sm-flex justify-content-start`}
            >
              <BiTimeFive className="me-1" color="#F38E82" size={25} />
              <strong> {data?.cooking_time}</strong>
              <span className="d-none d-sm-block ms-sm-2"> MINUTES</span>
            </div>
            <div className="d-sm-flex ms-sm-4">
              <FiUsers className="me-1" color="#F38E82" size={25} />
              <strong> {servingNo}</strong>
              <span className="d-none d-sm-block ms-sm-2"> SERVINGS</span>
            </div>
            <div className="d-flex  ms-sm-4">
              <AiOutlinePlusCircle
                onClick={() => SetServingNo(servingNo + 1)}
                className={`${styles["pointer"]}  me-2`}
                color="#F38E82"
                size={25}
              />
              <AiOutlineMinusCircle
                onClick={() => {
                  if (servingNo > 1) return SetServingNo(servingNo - 1);
                }}
                className={`${styles["pointer"]}`}
                color="#F38E82"
                size={25}
              />
            </div>
          </div>
          <div>
            <BsBookmark
              className={`${styles["pointer"]} me-4 me-sm-0`}
              size={25}
            />
          </div>
        </section>

        <section className={`${styles["ingredients"]} pt-1 pb-5 px-4 px-sm-5`}>
          <h6 className={`${styles["mainFont"]} text-center mt-4 py-4`}>
            RECIPE INGREDIENTS
          </h6>
          {/* TODO: newQt = oldQt * newServings / oldServings */}
          <ul className="list-unstyled row">
            {data?.ingredients.map((recipe, i) => (
              <li key={i} className="col-12 col-md-6">
                <div className="d-flex align-items-start">
                  <div className=" pt-3 pt-sm-4">
                    <BsCheck2 color="#F38E82" size={20} />
                  </div>
                  <div className=" pt-3 pt-sm-4 ms-3">
                    <span className=" me-2">
                      {" "}
                      {(recipe.quantity! * servingNo) / data.servings}
                    </span>
                    <span>{recipe.unit}</span> {recipe.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="p-3 px-4 p-sm-5 text-center">
          <h6 className={`${styles["mainFont"]} py-4`}>HOW TO COOK IT</h6>
          <p className=" px-sm-5 fs-5">
            This recipe was carefully designed and tested by{" "}
            <strong>{data?.publisher}</strong>. Please check out directions at
            their website.
          </p>
          <a href={data?.source_url} target="_blanck">
            <button
              className={`${styles["btnDirection"]} my-4 ps-4 btn text-white rounded-pill`}
            >
              Directions{" "}
              <BsArrowRightShort className={`me-2`} color="#fff" size={30} />
            </button>
          </a>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetails;
