import { useParams } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";
import { CommentSection } from "./CommentSection";
import { useEffect, useState } from "react";
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
    <>
      <ArticleBody article={article} />
      <CommentSection article_id={article_id} article={article} />
    </>
  );
};
