import { deleteComment } from "../utils/comments_api";
import { UserContext } from "../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { likeComment } from "../utils/comments_api";

export const SingleComment = ({ comment, setComments, setCommentDeleted }) => {
  const { user } = useContext(UserContext);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    setVotes(comment.votes);
  }, []);

  const removeComment = (comment_id) => {
    setCommentDeleted(false);
    const commentToRemove = document.getElementById(`comment-${comment_id}`);
    const deleteButton = document.getElementById(`delete-${comment_id}`);
    deleteButton.setAttribute("disabled", true);
    commentToRemove.classList.add("deleting");
    deleteComment(comment_id)
      .then(() => {
        setComments((currentComments) => {
          return currentComments.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
        });
        setCommentDeleted(true);
      })
      .catch(() => {
        deleteButton.setAttribute("disabled", false);
        deleteButton.innerText = "🗑️ - ERROR - COMMENT WAS NOT REMOVED!";
      });
  };

  const handleVote = (increment) => {
    setVotes((currentVotes) => {
      return (currentVotes += increment);
    });
    likeComment(comment.comment_id, increment).catch((err) => {
      let error = document.getElementById(
        `comment-vote-error-${comment.comment_id}`
      );
      error.innerText = " - Serverside error, please try again later";
      setVotes((currentVote) => {
        return (currentVote -= increment);
      });
    });
  };

  return (
    <article
      className="comment-box"
      id={`comment-${comment.comment_id}`}
      key={`comment-${comment.comment_id}`}
    >
      <p className="comment-head">
        <span className="bold-text">{comment.author}</span> -{" "}
        {new Date(comment.created_at).toDateString()}
      </p>
      <p className="comment-body">{comment.body}</p>
      <section className="comment-buttons">
        <Button
          className="btn-primary btn-sm"
          onClick={() => {
            handleVote(1);
          }}
        >
          👍
        </Button>
        <Button
          className="btn-primary btn-sm"
          onClick={() => {
            handleVote(-1);
          }}
        >
          👎
        </Button>
        {votes}
        <span
          id={`comment-vote-error-${comment.comment_id}`}
          className="error-text"
        ></span>
        {user === comment.author && (
          <Button
            className="btn-danger btn-sm"
            onClick={() => {
              removeComment(comment.comment_id);
            }}
            id={`delete-${comment.comment_id}`}
          >
            🗑️
          </Button>
        )}
      </section>
    </article>
  );
};
