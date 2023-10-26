import { useEffect, useState } from "react";
import { voteArticle, getArticle } from "../utils/articles_api";
import { Error } from "./Error";

export const ArticleBody = ({ article_id }) => {
  const [article, setArticle] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [error404, setError404] = useState(false);

  useEffect(() => {
    getArticle(article_id)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
        setVotes(article.votes);
      })
      .catch((err) => {
        setError404(true);
      });
  }, []);

  const handleVote = (increment) => {
    setVotes((currentVote) => {
      return (currentVote += increment);
    });
    voteArticle(article.article_id, increment).catch((err) => {
      let error = document.getElementById(`article-vote-error-${article_id}`);
      error.innerText = " - Serverside error, please try again later";
      setVotes((currentVote) => {
        return (currentVote -= increment);
      });
    });
  };

  if (error404) return <Error message="No such article found" />;

  if (isLoading) return <h4>Loading...</h4>;

  return (
    <article className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <h4>
        {article.author} - {new Date(article.created_at).toDateString()}
      </h4>
      <p className="article-body">{article.body}</p>
      <p>
        <button
          onClick={() => {
            handleVote(1);
          }}
        >
          👍
        </button>{" "}
        <button
          onClick={() => {
            handleVote(-1);
          }}
        >
          👎
        </button>{" "}
        {votes}
        <span
          id={`article-vote-error-${article.article_id}`}
          className="error-text"
        ></span>
      </p>
    </article>
  );
};
