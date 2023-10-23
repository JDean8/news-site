import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/articles",
});

export const getArticleSummaries = () => {
  return articlesAPI.get("/").then((response) => {
    return response.data.articles;
  });
};

export const getArticle = (article_id) => {
  return articlesAPI.get(`/${article_id}`).then((response) => {
    return response.data.article;
  });
};

export const getArticleComments = (article_id) => {
  return articlesAPI.get(`/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
};
