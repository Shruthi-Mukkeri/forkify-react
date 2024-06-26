import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import styles from "./RecipeDetails.module.css";
import { FiUsers } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { FaBookmark } from "react-icons/fa";
import { BsArrowRightShort, BsBookmark, BsCheck2 } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

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
  const [hash, setHash] = useState("");
  const [servingNo, SetServingNo] = useState<number>();
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [bookmarkList, setBookmarkList] = useState<Recipe[]>([]);
  // console.log(bookmarkList, "aside component");

  const addToBookmarkList = (recipe: Recipe | undefined) => {
    if (!recipe) return;
    setBookmarkList((prevList) =>
      prevList.some((r) => r.id === recipe.id)
        ? prevList.filter((r) => r.id !== recipe.id)
        : [...prevList, recipe]
    );
  };
  // localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  }, [bookmarkList]);
  console.log(bookmarkList, "ssssssssssssss");
  console.log(JSON.stringify(bookmarkList), "JSON.stringify(bookmarkList)");

  const RecipeId = `/${hash}`;
  const { data, error, isLoading } = useQuery<Recipe, Error>({
    queryKey: ["recipeDetails", RecipeId],
    queryFn: () =>
      apiClient.get<Root>(RecipeId).then((res) => res.data.data.recipe),
    staleTime: 10 * 60 * 1000, //1min
    enabled: !!hash, // Enable the query only when hash is present
  });

  const extractHashFromURL = () => {
    const hashValue = window.location.hash.substring(1);
    setHash(hashValue);
    // setBookmarked(false); // Toggle bookmark status
  };
  useEffect(() => {
    // if searched value exisits in local storage means already bookmarked then set bookmark to true
    // else the searchvalue item has no bookmark in db then set bookmark to false
  }, [
    hash, // the search value
  ]);

  useEffect(() => {
    extractHashFromURL();
    window.addEventListener("hashchange", extractHashFromURL);
    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", extractHashFromURL);
    };
  }, [hash]);

  useEffect(() => {
    SetServingNo(data?.servings!);
  }, [data?.servings]);

  if (!hash) {
    return (
      <h5 className={`py-5 text-center h-full`}>
        : ) Start by searching for a recipe or an ingredient. Have fun!
      </h5>
    );
  }

  if (error) return <h1 className="text-danger py-5">{error?.message}</h1>;
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      {/* recipe image of page */}
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
        {/* details of recipe data under image */}
        <section className="d-flex justify-content-between align-items-center my-4 py-4 pt-5 pe-2 pe-sm-0 mx-sm-5">
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
              <button className="btn border-0 p-0">
                <AiOutlineMinusCircle
                  onClick={() => {
                    if (servingNo! > 1) return SetServingNo(servingNo! - 1);
                  }}
                  className={`${styles["pointer"]}`}
                  color="#F38E82"
                  size={25}
                />
              </button>
              <button className="btn border-0 p-0">
                <AiOutlinePlusCircle
                  onClick={() => SetServingNo(servingNo! + 1)}
                  className={`${styles["pointer"]}  me-2`}
                  color="#F38E82"
                  size={25}
                />
              </button>
            </div>
          </div>
          <div
            className="bg-warning rounded-pill p-2 btnBackground"
            onClick={() => {
              setBookmarked(!bookmarked); // Toggle bookmark status
              addToBookmarkList(data!); // Add or remove from bookmark list
            }}
          >
            {bookmarked ? (
              <FaBookmark
                className={`${styles["pointer"]}`}
                color={"white"}
                size={23}
              />
            ) : (
              <BsBookmark
                className={`${styles["pointer"]}`}
                color={"white"}
                size={23}
              />
            )}
          </div>
        </section>
        {/* Ingredients of image under details */}
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
                      {recipe.quantity &&
                        (recipe.quantity! * servingNo!) / data.servings}
                    </span>
                    <span>{recipe.unit}</span> {recipe.description}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
        {/* recipe link form where it taken. */}
        <section className="p-3 px-4 p-sm-5 text-center">
          <h6 className={`${styles["mainFont"]} py-4`}>HOW TO COOK IT</h6>
          <p className=" px-sm-5 fs-5">
            This recipe was carefully designed and tested by{" "}
            <strong>{data?.publisher}</strong>. Please check out directions at
            their website.
          </p>
          <a href={data?.source_url} target="_blanck">
            <button className="btnBackground my-4 ps-4 btn text-white rounded-pill">
              Directions{" "}
              <BsArrowRightShort className={`me-2`} color="#fff" size={30} />
            </button>
          </a>
        </section>
      </div>
    </>
  );
};

export default RecipeDetails;
