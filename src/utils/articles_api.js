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

export const likeArticle = (article_id, setArticle) => {
  setArticle((currentArticle) => {
    currentArticle += 1;
    return currentArticle;
  });
  return articlesAPI
    .patch(`/${article_id}`, { inc_votes: 1 })
    .then((response) => {
      console.log(response.data.article.votes);
      return response.data.article.votes;
    })
    .catch((err) => {
      console.log(err);
      let error = document.getElementById(`article-vote-error-${article_id}`);
      error.innerText = " - Serverside error, please try again later";
      setArticle((currentArticle) => {
        currentArticle.votes -= 1;
        return currentArticle;
      });
    });
};

export const dislikeArticle = (article_id, setArticle) => {
  setArticle((currentArticle) => {
    currentArticle -= 1;
    return currentArticle;
  });
  return articlesAPI
    .patch(`/${article_id}`, { inc_votes: -1 })
    .then((response) => {
      console.log(response.data.article.votes);
      return response.data.article.votes;
    })
    .catch((err) => {
      console.log(err);
      let error = document.getElementById(`article-vote-error-${article_id}`);
      error.innerText = " - Serverside error, please try again later";
      setArticle((currentArticle) => {
        currentArticle.votes += 1;
        return currentArticle;
      });
    });
};
