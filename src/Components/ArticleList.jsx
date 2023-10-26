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

  useEffect(() => {
    getArticleSummaries(searchParams).then((summaries) => {
      setArticleSummaries(summaries);
      setIsLoading(false);
    });
  }, [searchParams]);

  function queryUpdater({ set_sort_by, set_order }) {
    setSearchParams((currentSearchParams) => {
      let newParams = {};
      for (const key of currentSearchParams.keys()) {
        if (currentSearchParams.get(key)) {
          newParams[key] = currentSearchParams.get(key);
        }
      }
      if (set_sort_by) newParams.sort_by = set_sort_by;
      if (set_order) newParams.order = set_order;
      return newParams;
    });
  }

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <>
      <nav className="sort-buttons">
        <DropdownButton
          id="dropdown-item-button  btn-sm"
          variant="secondary"
          title="Sort By"
        >
          <Dropdown.Item
            as="button"
            onClick={() => {
              queryUpdater({ set_sort_by: "comment_count" });
            }}
          >
            Comment Count
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              queryUpdater({ set_sort_by: "created_at" });
            }}
          >
            Created
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              queryUpdater({ set_sort_by: "votes" });
            }}
          >
            Votes
          </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          id="dropdown-item-button  btn-sm"
          title="Order"
          variant="secondary"
        >
          <Dropdown.Item
            as="button"
            onClick={() => {
              queryUpdater({ set_order: "desc" });
            }}
          >
            descending
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              queryUpdater({ set_order: "asc" });
            }}
          >
            ascending
          </Dropdown.Item>
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
