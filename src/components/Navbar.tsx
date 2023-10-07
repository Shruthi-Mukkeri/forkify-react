import { useRef } from "react";
import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";
import { BsBookmark, BsSearch } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

interface Props {
  onSearch: (searchValue: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <div className="px-sm-3 d-flex justify-content-between align-items-center">
      <img
        alt="logo"
        width={130}
        className={`${styles.logo} object-fit-contain pe-3 my-3 my-md-0`}
        src={logo}
      ></img>

      <form
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
          className={`${styles["searchBtn"]} p-2 p-md-3 px-md-4 rounded-pill text-white d-flex align-items-center`}
        >
          <BsSearch className="ms-md-3 " size="18" />
          <button
            className={`bg-transparent d-none d-md-block mx-2 text-white fs-6 border-0 rounded-pill  `}
          >
            SEARCH
          </button>
        </div>
      </form>

      <div className="d-flex flex-no-wrap">
        <div
          className={` ${styles["navBtn"]} ms-2 d-flex align-items-center p-2 py-md-4`}
        >
          <LiaEdit color="#F38E82" size="24" />
          <button
            className={`border-0 text-nowrap bg-transparent d-none d-md-block`}
          >
            ADD RECIPE
          </button>
        </div>

        <div
          className={`${styles["navBtn"]} d-flex align-items-center  p-2 py-md-4`}
        >
          <BsBookmark color="#F38E82" size="18" />
          <button
            className={`border-0 bg-transparent my-md-2 d-none d-md-block`}
          >
            BOOKMARK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
