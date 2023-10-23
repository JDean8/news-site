import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/articles",
});

export const getArticleSummaries = () => {
  return articlesAPI.get("/").then((response) => {
    return response.data.articles;
  });
};
