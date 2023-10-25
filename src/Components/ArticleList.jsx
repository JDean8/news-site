import { useEffect, useState } from "react";
import { getArticleSummaries } from "../utils/articles_api";
import { ArticleCard } from "./ArticleCard";
import { useSearchParams } from "react-router-dom";

export const ArticleList = () => {
  const [articleSummaries, setArticleSummaries] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const topic = searchParams.get("topic");

  useEffect(() => {
    getArticleSummaries(topic).then((summaries) => {
      setArticleSummaries(summaries);
      setIsLoading(false);
    });
  }, [searchParams]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <main className="article-list">
      {articleSummaries.map((articleSummary) => {
        return (
          <ArticleCard
            key={`article-card-${articleSummary.article_id}`}
            articleSummary={articleSummary}
          />
        );
      })}
    </main>
  );
};
