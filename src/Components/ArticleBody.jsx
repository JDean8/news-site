import { useEffect, useState } from "react";
import { dislikeArticle, getArticle, likeArticle } from "../utils/articles_api";

export const ArticleBody = ({ article_id }) => {
  const [article, setArticle] = useState([{}]);

  useEffect(() => {
    getArticle(article_id).then((article) => {
      setArticle(article);
    });
  }, [article]);

  return (
    <article className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <h4>
        {article.author} - {new Date(article.created_at).toDateString()}
      </h4>
      <p className="article-body">{article.body}</p>
      <p>
        <button
          onClick={() => {
            likeArticle(article.article_id, setArticle);
          }}
        >
          👍
        </button>{" "}
        <button
          onClick={() => {
            dislikeArticle(article.article_id, setArticle);
          }}
        >
          👎
        </button>{" "}
        {article.votes}
        <span
          id={`article-vote-error-${article.article_id}`}
          className="error-text"
        ></span>
      </p>
    </article>
  );
};
