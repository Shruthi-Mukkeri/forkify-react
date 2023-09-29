import logo from "../assets/logo.png";
import styles from "./Navbar.module.css";
import { BsBookmark, BsSearch } from "react-icons/bs";
import { LiaEdit } from "react-icons/lia";

const Navbar = () => {
  return (
    <div className="px-3 d-flex justify-content-between align-items-center">
      <img
        alt="logo"
        width={130}
        className={`${styles.logo} object-fit-contain pe-3 my-3 my-md-0`}
        src={logo}
      ></img>
      <div className={`${styles["inputSearch"]} d-flex rounded-pill bg-white`}>
        <input
          type="text"
          className={`${styles["inputSearchElement"]} w-100 fs-6 ps-1 ps-sm-3 ps-md-4 rounded-pill border-0 `}
          placeholder="Search over 1,000,000 recipes..."
        ></input>
        <div
          className={`${styles["searchBtn"]} p-2 rounded-pill text-white d-flex align-items-center`}
        >
          <BsSearch className="me-md-2 mx-md-1" size="18" />
          <button
            className={`bg-transparent d-none d-md-block  text-white fs-6 border-0 rounded-pill  `}
          >
            SEARCH
          </button>
        </div>
      </div>

      <div className="d-flex flex-no-wrap">
        <div
          className={` ${styles["navBtn"]} ms-2 d-flex align-items-center py-4 py-md-5 p-2 p-md-4`}
        >
          <LiaEdit color="#F38E82" size="24" />
          <button
            className={`border-0 text-nowrap bg-transparent d-none d-md-block`}
          >
            ADD RECIPE
          </button>
        </div>

        <div
          className={`${styles["navBtn"]} d-flex align-items-center py-4 py-md-5  p-2 p-md-4`}
        >
          <BsBookmark color="#F38E82" size="18" />
          <button className={`border-0 bg-transparent d-none d-md-block`}>
            BOOKMARK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
