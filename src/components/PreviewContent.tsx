import { Recipe } from "./Aside";
import styles from "./PreviewContent.module.css";

const PreviewContent = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div>
      {" "}
      <a
        href={"#" + recipe.id}
        key={recipe.id}
        className={`${styles["previewRecipe"]} nav-link text-uppercase p-2 my-1`}
      >
        <div className="d-flex align-items-center p-2">
          <img
            className={`${styles["previewImage"]} rounded-circle object-fit-cover`}
            src={recipe.image_url}
            alt={recipe.title}
          />
          <div className="ps-3">
            <p className={`${styles["previewTitle"]}  mb-1 `}>
              {recipe?.title}
            </p>
            <p className={`mb-1 ${styles["previewPublisher"]}`}>
              {recipe?.publisher}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default PreviewContent;
