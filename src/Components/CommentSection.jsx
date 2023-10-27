import { useContext, useEffect, useState } from "react";
import { getArticleComments, postComment } from "../utils/articles_api";
import { UserContext } from "../Context/UserContext";
import { SingleComment } from "./SingleComment";

export const CommentSection = ({ article_id }) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([{}]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [error404, setError404] = useState(false);

  useEffect(() => {
    getArticleComments(article_id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError404(true);
      });
  }, []);

  const handleSumbit = (event) => {
    event.preventDefault();
    setCommentDeleted(false);
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
      <textarea
        className="comment-box"
        id="new-comment"
        value={newComment}
        onChange={(event) => setNewComment(event.target.value)}
      ></textarea>{" "}
      <button className="comment-submit">Post comment</button>
      <p id="comment-error" className="error-text"></p>
    </form>
  );

  if (error404) return;

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
        {commentDeleted && (
          <p className="deleting">Comment Deleted Successfully</p>
        )}
        {comments.map((comment) => {
          return (
            <SingleComment
              key={`comment-${comment.comment_id}`}
              comment={comment}
              setComments={setComments}
              setCommentDeleted={setCommentDeleted}
            />
          );
        })}
      </section>
    </>
  );
};
