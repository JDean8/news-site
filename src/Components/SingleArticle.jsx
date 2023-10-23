import { useParams } from "react-router-dom";
import { ArticleBody } from "./ArticleBody";
import { CommentSection } from "./CommentSection";

export const Article = () => {
  const { article_id } = useParams();

  return (
    <>
      <ArticleBody article_id={article_id} />
      <CommentSection article_id={article_id} />
    </>
  );
};
