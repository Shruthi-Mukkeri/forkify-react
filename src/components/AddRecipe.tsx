import { FieldValues, useForm } from "react-hook-form";
import { Ingredient, Recipe } from "./RecipeDetails";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import styles from "./AddRecipe.module.css";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
// import { useState } from "react";

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const AddRecipe = ({ onClose }: Props) => {
  const { register, handleSubmit } = useForm();
  // const [isOpenAddRecipe, setIsOpenAddRecipe] = useState(true);

  const addNewRecipe = useMutation({
    mutationFn: (newData: Recipe) =>
      apiClient.post<Recipe>("/", newData).then((res) => res.data),
    onSuccess(savReciData, reciInputData) {
      console.log(savReciData, reciInputData);
    },
    onError(err: Error) {
      console.log("Error:", err.message);
    },
  });

  const handleFormSubmit = (data: FieldValues) => {
    const ingredientsFields: Record<string, string> = {};
    const nonIngredients: Record<string, string> = {};

    for (const i in data) {
      if (i.startsWith("ingredients")) {
        ingredientsFields[i] = data[i];
      } else {
        nonIngredients[i] = data[i];
      }
    }
    const newIngredients: Ingredient[] = [];

    for (let i = 1; i <= 6; i++) {
      const ingredientsField = ingredientsFields[`ingredients${i}`];
      if (!ingredientsField) continue;
      const [quantity, unit, description] = ingredientsField
        .split(",")
        .map((item: string) => item.trim());
      if (quantity && unit && description) {
        newIngredients.push({
          quantity: parseFloat(quantity),
          unit: unit.trim(),
          description: description.trim(),
        });
      } else {
        //TODO: render mesg to display
        console.log("please enter correct formate");
      }
    }
    // setIngredients(newIngredients);
    const newData: Recipe = {
      id: new Date().getTime().toString(),
      title: nonIngredients.title,
      publisher: nonIngredients.publisher,
      source_url: nonIngredients.url,
      image_url: nonIngredients.imageUrl,
      servings: +nonIngredients.servings,
      ingredients: newIngredients,
      cooking_time: +nonIngredients.cooking_time,
    };
    console.log("Data: ", newData);

    addNewRecipe.mutate(newData);
  };

  return (
    <>
      <div
        className={`${styles.overlay} vh-100 position-fixed top-0 start-0 end-0`}
        onClick={() => {
          onClose();
          console.log("overlay clicked");
        }}
      ></div>
      <div
        className={`${styles.addRecipeWindow} position-fixed top-50 start-50 p-2 p-md-3 bg-white rounded-3 m-auto`}
      >
        <div className="d-flex justify-content-end w-100">
          <IoClose
            onClick={() => {
              onClose();
              console.log("close clicked");
            }}
            className="pointer"
            size={28}
          />
        </div>
        <form className="p-md-4" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="row">
            <div className="col-12 col-md-6">
              <h3>RECIPE DATA</h3>
              <div className="row pt-2 ">
                <div className="col-3">
                  <label htmlFor="title">Title</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("title")}
                    className="form-control"
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-3">
                  <label htmlFor="url">URL</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("url")}
                    className="form-control"
                    type="url"
                    name="url"
                    id="url"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-3">
                  <label htmlFor="imageUrl">Image Url</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("imageUrl")}
                    className="form-control"
                    type="url"
                    name="imageUrl"
                    id="imageUrl"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-3">
                  <label htmlFor="publisher">Publisher</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("publisher")}
                    className="form-control"
                    type="text"
                    name="publisher"
                    id="publisher"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-3">
                  <label htmlFor="cooking_time">Prep time</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("cooking_time")}
                    className="form-control"
                    type="number"
                    name="cooking_time"
                    id="cooking_time"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-3">
                  <label htmlFor="servings">Servings</label>
                </div>
                <div className="col-9">
                  <input
                    {...register("servings")}
                    className="form-control"
                    type="number"
                    name="servings"
                    id="servings"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <h3>INGREDIENTS</h3>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label className="text-nowrap pt-2" htmlFor="ingredients1">
                    Ingredients 1
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients1")}
                    className="form-control"
                    type="text"
                    name="ingredients1"
                    id="ingredients1"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label className="text-nowrap pt-2" htmlFor="ingredients2">
                    Ingredients 2
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients2")}
                    className="form-control"
                    type="text"
                    name="ingredients2"
                    id="ingredients2"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label htmlFor="ingredients3" className="text-nowrap pt-2">
                    Ingredients 3
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients3")}
                    className="form-control"
                    type="text"
                    name="ingredients3"
                    id="ingredients3"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label className="text-nowrap pt-2" htmlFor="ingredients4">
                    Ingredients 4
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients4")}
                    className="form-control"
                    type="text"
                    name="ingredients4"
                    id="ingredients4"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label className="text-nowrap pt-2" htmlFor="ingredients5">
                    Ingredients 5
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients5")}
                    className="form-control"
                    type="text"
                    name="ingredients5"
                    id="ingredients5"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="row pt-2">
                <div className="col-5 col-sm-4">
                  <label className="text-nowrap pt-2" htmlFor="ingredients6">
                    Ingredients 6
                  </label>
                </div>
                <div className="col-7 col-sm-8">
                  <input
                    {...register("ingredients6")}
                    className="form-control"
                    type="text"
                    name="ingredients6"
                    id="ingredients6"
                    placeholder="Format: 'Quantity,Unit,Description'"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-100 mt-4 d-flex justify-content-center">
            <button
              className={`${[
                styles.btnAdd,
              ]} rounded-pill px-4 py-2  btn border-0 text-white`}
              type="submit"
            >
              <FiUploadCloud size={23} className="me-2" />
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRecipe;
