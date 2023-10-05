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

const Aside = () => {
  // const pageSize = 10;
  // const [page, setPage] = useState(1);

  // const queryVar: PostQuery = {
  //   page: page,
  //   pageSize: pageSize,
  // };
  const { data } = useQuery<Data>({
    queryKey: [
      "recipes",
      // queryVar
    ],
    queryFn: () =>
      apiClient
        .get<Root>("/", {
          params: {
            search: "pizza",
            // _start: (queryVar.page - 1) * queryVar.pageSize,
            // _limit: "10",
          },
        })
        .then((res) => res.data.data),
    staleTime: 10 * 60 * 1000,
  });

  return (
    <div className="">
      {data?.recipes.map((recipe) => {
        return (
          <a
            href="#"
            key={recipe.id}
            className={`nav-link text-uppercase border px-2 my-3`}
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
    </div>
  );
};

export default Aside;
