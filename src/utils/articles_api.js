import axios from "axios";

const articlesAPI = axios.create({
  baseURL: "https://news-api-vzif.onrender.com/api/articles",
});

export const getArticleSummaries = (topic) => {
  return articlesAPI
    .get("/", {
      params: {
        topic,
      },
    })
    .then((response) => {
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
