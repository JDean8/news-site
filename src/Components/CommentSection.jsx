import { useContext, useEffect, useState } from "react";
import { getArticleComments, postComment } from "../utils/articles_api";
import { UserContext } from "../Context/UserContext";

export const CommentSection = ({ article_id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([{}]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleComments(article_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

  const handleSumbit = (event) => {
    event.preventDefault();
    const comment = event.target[0].value;
    const commentError = document.getElementById("comment-error");
    if (comment.length === 0) {
      commentError.innerText = "Comment must not be blank";
    } else if (user === "") {
      commentError.innerText = "User must be signed in";
    } else {
      commentError.innerText = "";
      postComment(article_id, user, comment).then((newComment) => {
        setNewComment("");
        setComments([newComment, ...comments]);
      });
    }
  };

  const commentBox = (
    <form onSubmit={handleSumbit} className="comment-form">
      <label htmlFor="new-comment">New comment:</label>
      <input
        className="comment-box"
        id="new-comment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      ></input>{" "}
      <button className="comment-submit">Post comment</button>
      <p id="comment-error" className="error-text"></p>
    </form>
  );

  if (isLoading) return <h5>Loading...</h5>;

  if (comments.length === 0) {
    return (
      <>
        {commentBox}
        <section className="comment-section">
          <div className="border"> </div>
          <p>No Comments</p>
        </section>
      </>
    );
  }

  return (
    <>
      {commentBox}
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
    </>
  );
};
