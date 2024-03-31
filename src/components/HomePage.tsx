import { useState } from "react";
import Aside from "./Aside";
import styles from "./Homepage.module.css";
import Navbar from "./Navbar";
import RecipeDetails from "./RecipeDetails";

const HomePage = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <div className={` ${styles["mainContainer"]}`}>
        <nav className={`p-2 ${styles["nav"]}`}>
          <Navbar onSearch={(searchValue) => setSearchInput(searchValue)} />
        </nav>
        <aside className={`p-0 d-none d-lg-block ${styles.aside}`}>
          <Aside previewName={searchInput} />
        </aside>
        <main className={`p-0 ${styles["recipeDetail"]}`}>
          <RecipeDetails />
        </main>
      </div>
    </>
  );
};

export default HomePage;
