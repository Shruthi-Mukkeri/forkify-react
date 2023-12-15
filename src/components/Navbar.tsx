import { useRef, useState } from "react";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";
import { BsBookmark, BsSearch } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";
import AddRecipe from "./AddRecipe";
import BookmarkRecipes from "./BookmarkRecipes";

interface Props {
  onSearch: (searchValue: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  const [isOpenAddRecipe, setIsOpenAddRecipe] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
    // console.log("hovering");
  };

  const handleMouseOut = () => {
    setIsHovering(false);
    // console.log("not hovering");
  };

  const searchRef = useRef<HTMLInputElement>(null);

  const handleAddRecipeToggle = () => {
    setIsOpenAddRecipe(!isOpenAddRecipe);
  };

  return (
    <>
      <div
        id={styles.navbar}
        className="px-sm-3 d-flex justify-content-between align-items-center"
      >
        <img
          alt="logo"
          width={130}
          className={`object-fit-contain pe-3 my-3 my-md-0`}
          src={logo}
        ></img>

        <form
          //ms-2 d-flex align-items-center p-2 py-md-4
          className={`${styles["inputSearch"]} d-flex rounded-pill bg-white`}
          onSubmit={(e) => {
            e.preventDefault();
            if (searchRef.current) onSearch(searchRef.current.value);
          }}
        >
          <input
            type="text"
            ref={searchRef}
            className={`${styles["inputSearchElement"]} w-100 fs-6 ps-1 ps-sm-3 ps-md-4 rounded-pill border-0 `}
            placeholder="Search over 1,000,000 recipes..."
          ></input>
          <div
            className={`${styles["searchBtn"]} pointer btnBackground p-2 p-md-3 px-md-4 rounded-pill text-white d-flex align-items-center`}
          >
            <BsSearch title={"Search"} className="ms-md-3" size="18" />
            <button
              className={`bg-transparent d-none d-md-block mx-2 text-white fs-6 border-0 rounded-pill  `}
            >
              SEARCH
            </button>
          </div>
        </form>

        <div className="d-flex flex-no-wrap">
          <div
            className={`${styles.navBtn} pointer ms-2 d-flex align-items-center p-2 py-md-4`}
            onClick={() => handleAddRecipeToggle()}
          >
            <LiaEdit title="Add Recipe" color="#F38E82" size="24" />
            <button
              className={`border-0 text-nowrap bg-transparent d-none d-md-block`}
            >
              ADD RECIPE
            </button>
          </div>

          <div
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className={`${[styles.navBtn, styles.cursor, styles.bookMark].join(
              " "
            )} d-flex align-items-center  p-2 py-md-4`}
            onClick={() => {
              console.log("clicked");
            }}
          >
            <BsBookmark title="Bookmark" color="#F38E82" size="18" />
            <button
              className={`border-0 bg-transparent my-md-2 d-none d-md-block`}
            >
              BOOKMARK
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpenAddRecipe ? "d-block" : "d-none"
        }  bg-white z-2 vh-100`}
      >
        <AddRecipe isOpen={isOpenAddRecipe} onClose={handleAddRecipeToggle} />
      </div>
      {isHovering ? (
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={`${styles.bookmarkHoverContent} p-4`}
        >
          <BookmarkRecipes />
        </div>
      ) : (
        " "
      )}
    </>
  );
};

export default Navbar;
