import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import PreviewContent from "./PreviewContent";
import { useEffect } from "react";
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
  const { data, isLoading, error, refetch } = useQuery<Data, Error>({
    queryKey: ["recipes", previewName],
    queryFn: () =>
      apiClient
        .get<Root>("/", {
          params: {
            search: previewName,
          },
        })
        .then((res) => res.data.data),

    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: false, // Disable the query initially
  });

  useEffect(() => {
    if (previewName) {
      // Enable and refetch the query when previewName is provided
      refetch();
    }
  }, [previewName, refetch]);

  if (isLoading) return <h1> loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

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
      {data.recipes.length < 1 ? (
        <>
          <h5 className="text-center py-5">
            No recipe found. <br /> Please try again
          </h5>
        </>
      ) : (
        <>
          (
          {data?.recipes.map((recipe) => {
            return <PreviewContent key={recipe.id} recipe={recipe} />;
          })}
          )
        </>
      )}
    </>
  );
};

export default Aside;
