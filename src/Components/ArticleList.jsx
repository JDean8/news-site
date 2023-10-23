import { useEffect, useState } from "react";
import { getArticleSummaries } from "../utils/articles_api";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  const [articleSummaries, setArticleSummaries] = useState([{}]);

  useEffect(() => {
    getArticleSummaries().then((summaries) => {
      setArticleSummaries(summaries);
    });
  }, []);

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
