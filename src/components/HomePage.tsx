import { useState } from "react";
import Aside from "./Aside";
import styles from "./Homepage.module.css";
import Navbar from "./Navbar";
import RecipeDetails from "./RecipeDetails";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <div
        className={`container-xl bg-white overflow-hidden ${styles["mainContainer"]}`}
      >
        <div className="row">
          <div className={`col ${styles["nav"]}`}>
            <Navbar onSearch={(searchValue) => setSearchInput(searchValue)} />
          </div>
        </div>
        <div className="row">
          <div
            className={`col-4 p-0 d-none d-lg-block bg-danger ${styles.AsideHeight}`}
          >
            <Aside previewName={searchInput} />
          </div>
          <div className={`col p-0 ${styles["recipeDetailContent"]}`}>
            <RecipeDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
