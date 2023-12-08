import { useContext } from "react";
import bookMarkContext from "../services/context";
import PreviewContent from "./PreviewContent";

const BookmarkRecipes = () => {
  const { bookMarkList } = useContext(bookMarkContext) || {
    bookMarkList: [],
    setBookMarkList: () => {},
  };
  // console.log(data?.bookMarkList);
  // const [bookMarkList, setBookMarkList] = useState<Recipe[]>([]);
  return (
    <div>
      {bookMarkList.map((recipe) => (
        <PreviewContent recipe={recipe} />
      ))}
    </div>
  );
};

export default BookmarkRecipes;
