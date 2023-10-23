export const ArticleCard = ({ articleSummary }) => {
  return (
    <article className="article-card">
      <img src={articleSummary.article_img_url} />
      <summary>
        <h4 className="article-card-heading">{articleSummary.title}</h4>
        <p className="article-card-author">{articleSummary.author}</p>
        <p className="article-card-topic">{articleSummary.topic}</p>
        <p className="article-card-date">
          {new Date(articleSummary.created_at).toDateString()}
        </p>
        <p className="article-card-stats">
          👍 {articleSummary.votes} 💬 {articleSummary.comment_count}
        </p>
      </summary>
    </article>
  );
};
