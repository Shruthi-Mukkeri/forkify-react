import { Dispatch, SetStateAction, createContext } from "react";
import { Recipe } from "../components/Aside";

interface BookMarkContextProps {
  bookMarkList: Recipe[];
  setBookMarkList: Dispatch<SetStateAction<Recipe[]>>;
}

const bookMarkContext = createContext<BookMarkContextProps | undefined>(
  undefined
);

export default bookMarkContext;
