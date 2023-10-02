import Aside from "./Aside";
import styles from "./Homepage.module.css";
import Navbar from "./Navbar";
import RecipeDetails from "./RecipeDetails";

const HomePage = () => {
  return (
    <>
      <div
        className={`container-xl bg-white overflow-hidden ${styles["mainContainer"]}`}
      >
        <div className="row">
          <div className={`col ${styles["nav"]}`}>
            <Navbar />
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-0">
            <Aside />
          </div>
          <div className={`col ${styles["aside"]}`}>
            <RecipeDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
