import { Link } from "react-router-dom";

export const ArticleCard = ({ articleSummary }) => {
  return (
    <Link
      to={`/articles/${articleSummary.article_id}`}
      className="article-card"
    >
      <img src={articleSummary.article_img_url} />
      <summary>
        <h2 className="article-card-heading">{articleSummary.title}</h2>
        <p className="article-card-author">{articleSummary.author}</p>
        <p className="article-card-topic">{articleSummary.topic}</p>
        <p className="article-card-date">
          {new Date(articleSummary.created_at).toDateString()}
        </p>
        <p className="article-card-stats">
          👍 {articleSummary.votes} 💬 {articleSummary.comment_count}
        </p>
      </summary>
    </Link>
  );
};
