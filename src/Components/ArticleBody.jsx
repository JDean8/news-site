import { useEffect, useState } from "react";
import { getArticle } from "../utils/articles_api";

export const ArticleBody = ({ article_id }) => {
  const [article, setArticle] = useState([{}]);

  useEffect(() => {
    getArticle(article_id).then((article) => {
      setArticle(article);
    });
  }, []);

  return (
    <article className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <h4>
        {article.author} - {new Date(article.created_at).toDateString()}
      </h4>
      <p className="article-body">{article.body}</p>
      <p>👍 {article.votes}</p>
    </article>
  );
};
