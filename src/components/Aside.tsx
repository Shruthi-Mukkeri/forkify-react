import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import styles from "./Aside.module.css";
// import { useState } from "react";

export interface Root {
  status: string;
  results: number;
  data: Data;
}

export interface Data {
  recipes: Recipe[];
}

export interface Recipe {
  publisher: string;
  image_url: string;
  title: string;
  id: string;
}

// interface PostQuery {
//   page: number;
//   pageSize: number;
// }
interface Props {
  previewName: string;
}

const Aside = ({ previewName }: Props) => {
  // const pageSize = 10;
  // const [page, setPage] = useState(1);

  // const queryVar: PostQuery = {
  //   page: page,
  //   pageSize: pageSize,
  // };
  const { data, isLoading, error } = useQuery<Data, Error>({
    queryKey: ["recipes", previewName],
    queryFn: () =>
      apiClient
        .get<Root>("/", {
          params: {
            search: previewName,
          },
        })
        .then((res) => res.data.data),

    staleTime: 10 * 60 * 1000,
  });
  // console.log("data is: ", data);

  if (isLoading) return <h1>Loading....</h1>;
  if (error) return <h1>{error.message}</h1>;

  // if (!data) {
  //   console.log("data issssssssss:", data);
  //   return <h1>No recipe found for your query! Please try again</h1>;
  // }

  // data?.recipes.length! > 0 ? (
  //   <h1>loadin</h1>
  // ) :
  if (data.recipes.length < 1)
    return (
      <h5 className="text-center py-5">
        No recipe found. <br /> Please try again
      </h5>
    );
  return (
    <>
      {data?.recipes.map((recipe) => {
        return (
          <a
            href={"#" + recipe.id}
            key={recipe.id}
            className={`${styles["previewRecipe"]} nav-link text-uppercase p-2 my-1`}
          >
            <div className="d-flex align-items-center p-2">
              <img
                className={`${styles["previewImage"]} rounded-circle object-fit-cover`}
                src={recipe.image_url}
                alt={recipe.title}
              />
              <div className="ps-3">
                <p className={`${styles["previewTitle"]}  mb-1 `}>
                  {recipe?.title}
                </p>
                <p className={`mb-1 ${styles["previewPublisher"]}`}>
                  {recipe?.publisher}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </>
  );
};

export default Aside;
