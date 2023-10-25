import { useEffect, useState } from "react";
import { getArticleSummaries } from "../utils/articles_api";
import { ArticleCard } from "./ArticleCard";
import { useSearchParams, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export const ArticleList = () => {
  const [articleSummaries, setArticleSummaries] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  let topic = searchParams.get("topic");
  let sort_by = searchParams.get("sort_by");

  useEffect(() => {
    getArticleSummaries(searchParams).then((summaries) => {
      setArticleSummaries(summaries);
      setIsLoading(false);
    });
  }, [searchParams]);

  function sortByUpdater(sort_by) {
    setSearchParams((currentSearchParams) => {
      let newParams = { ...currentSearchParams };
      if (sort_by) newParams.sort_by = sort_by;
      if (topic) newParams.topic = topic;
      return newParams;
    });
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <nav>
        <DropdownButton id="dropdown-item-button  btn-sm" title="Sort By">
          <Dropdown.Item
            as="button"
            onClick={() => {
              sortByUpdater("comment_count");
            }}
          >
            Comment Count
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              sortByUpdater("created_at");
            }}
          >
            Created
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              sortByUpdater("votes");
            }}
          >
            Votes
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-item-button  btn-sm" title="Order">
          <Dropdown.Item as="button">descending</Dropdown.Item>
          <Dropdown.Item as="button">ascending</Dropdown.Item>
        </DropdownButton>
      </nav>

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
    </>
  );
};
