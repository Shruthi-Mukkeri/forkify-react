import styles from "./Homepage.module.css";
import Navbar from "./Navbar";

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
          <div className="col-4 bg-primary">Aside</div>
          <div className="col bg-secondary">main</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
