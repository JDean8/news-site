import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/articles",
});

export const getArticles = () => {
  return articlesAPI.get("/").then((response) => {
    return response.data.articles;
  });
};
