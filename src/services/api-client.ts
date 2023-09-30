import axios from "axios";

export default axios.create({
  baseURL: "https://forkify-api.herokuapp.com/api/v2/recipes",
  params: { key: "c316814f-ecaf-4aa9-85a9-e82a4b920543" },
});
