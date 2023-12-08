import "./App.css";
import HomePage from "./components/HomePage";
import "./index.css";

function App() {
  // const [bookMarkList, setBookMarkList] = useState<Recipe[]>([]);
  return (
    <>
      {/* <bookMarkContext.Provider value={{ bookMarkList, setBookMarkList }}> */}
      <HomePage />
      {/* </bookMarkContext.Provider> */}
    </>
  );
}

export default App;
