import { useParams } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";

export const Article = () => {
  const { article_id } = useParams();

  return (
    <>
      <ArticleBody article_id={article_id} />
    </>
  );
};
