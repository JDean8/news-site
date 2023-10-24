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
      console.log("Am i looping?");
    });
  }, [searchParams]);

  if (isLoading) return <h5>Loading...</h5>;

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
