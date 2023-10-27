import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { ArticleCard } from "./ArticleCard";
import { getArticleSummaries } from "../utils/articles_api";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [topArticleSummaries, setTopArticleSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userFriendlyName } = useContext(UserContext);

  useEffect(() => {
    const topArticles = [];
    Promise.all([
      getArticleSummaries(new URLSearchParams("sort_by=created_at")),
      getArticleSummaries(new URLSearchParams("sort_by=comment_count")),
      getArticleSummaries(new URLSearchParams("sort_by=votes")),
    ]).then(([created, comment, votes]) => {
      console.log(comment);
      topArticles[0] = created.summaries[0];
      topArticles[1] = comment.summaries[0];
      topArticles[2] = votes.summaries[0];
      setTopArticleSummaries(topArticles);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <h3>Welcome back {userFriendlyName}</h3>
      <Link to="/articles">All Articles</Link>
      <main>
        <article>
          <h4>Latest:</h4>
          <ArticleCard articleSummary={topArticleSummaries[0]} />
        </article>
        <article>
          <h4>Most comments:</h4>
          <ArticleCard articleSummary={topArticleSummaries[1]} />
        </article>
        <article>
          <h4>Most likes:</h4>
          <ArticleCard articleSummary={topArticleSummaries[2]} />
        </article>
      </main>
    </>
  );
};
