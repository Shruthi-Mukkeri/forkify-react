import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import PreviewContent from "./PreviewContent";
import { useState } from "react";
import styles from "./Aside.module.css";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";
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

interface Props {
  previewName: string;
}

const Aside = ({ previewName }: Props) => {
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  const { data, isLoading, error } = useQuery<Data, Error>({
    queryKey: ["recipe", previewName],
    queryFn: () =>
      apiClient
        .get<Root>("/", {
          params: {
            search: previewName,
          },
        })
        .then((res) => res.data.data),

    staleTime: 1000 * 60 * 5, // 5 minutes
    // enabled: false, // Disable the query initially
  });

  if (isLoading) return <h1> loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  const updatedData = {
    ...data,
    recipes: data.recipes.slice(start, end), // Update the 'recipes' array
  };

  const handlePrevPage = () => {
    setPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setPage((page) => page + 1);
  };

  const numOfPages = Math.ceil(data?.recipes.length / pageSize);
  return (
    <>
      {/* {page === numOfPages && numOfPages > 1 && (last page)}
      {page === 1 && numOfPages > 1 && (page 1 and others)}
      {page < numOfPages && (other pages)} */}

      {updatedData.recipes.length < 1 ? (
        <>
          <h5 className="text-center py-5">
            No recipe found. <br /> Please try again
          </h5>
        </>
      ) : (
        <>
          {updatedData?.recipes.map((recipe) => {
            return <PreviewContent key={recipe.id} recipe={recipe} />;
          })}
          <div className="mx-4">
            <button
              className={`${
                page === 1 && numOfPages > 1 ? "d-none" : "d-block"
              } float-start align-items-center d-flex gap-2 border-0 rounded-pill fw-bold ${
                styles.btnPagination
              } fw-semibold`}
              onClick={handlePrevPage}
            >
              <IoMdArrowBack size={20} /> {page - 1}
            </button>
            <button
              className={`${
                page === numOfPages && numOfPages > 1 ? "d-none" : "d-block"
              } float-end border-0 align-items-center d-flex gap-2 rounded-pill fw-bold ${
                styles.btnPagination
              }`}
              onClick={handleNextPage}
            >
              {page + 1} <IoMdArrowForward size={20} />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Aside;
