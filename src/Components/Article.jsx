import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/articles_api";

export const Article = () => {
  const { article_id } = useParams();

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
