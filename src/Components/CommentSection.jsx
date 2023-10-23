import { useEffect, useState } from "react";
import { getArticleComments } from "../utils/articles_api";

export const CommentSection = ({ article_id, article }) => {
  const [comments, setComments] = useState([{}]);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
    });
  }, []);

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
