import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/articles",
});

export const getArticleSummaries = (params) => {
  return articlesAPI.get("/", { params }).then((response) => {
    return { summaries: response.data.articles, count: response.data.count };
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

export const voteArticle = (article_id, increment) => {
  return articlesAPI.patch(`/${article_id}`, { inc_votes: increment });
};

export const postComment = (article_id, user, body) => {
  return articlesAPI
    .post(`/${article_id}/comments`, { username: user, body })
    .then((response) => {
      return response.data.comment;
    });
};
