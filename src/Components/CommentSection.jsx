import { useEffect, useState } from "react";
import { getArticleComments } from "../utils/articles_api";

export const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h4>Loading...</h4>;

  if (comments.length === 0) {
    return (
      <section className="comment-section">
        <div className="border"> </div>
        <p>No Comments</p>
      </section>
    );
  }

  return (
    <section className="comment-section">
      <div className="border"> </div>
      {comments.map((comment) => {
        return (
          <article
            className="comment-box"
            key={`comment-${comment.comment_id}`}
          >
            <p className="comment-head">
              <span className="bold-text">{comment.author}</span> -{" "}
              {new Date(comment.created_at).toDateString()}
            </p>
            <p className="comment-body">{comment.body}</p>
            <p className="comment-votes">👍 {comment.votes}</p>
          </article>
        );
      })}
    </section>
  );
};
