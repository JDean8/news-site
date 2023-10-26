import { useEffect, useState } from "react";
import { getArticleSummaries } from "../utils/articles_api";
import { ArticleCard } from "./ArticleCard";
import { useSearchParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";
import { Error } from "./Error";

export const ArticleList = () => {
  const [articleSummaries, setArticleSummaries] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error400, setError400] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getArticleSummaries(searchParams)
      .then(({ summaries, count }) => {
        setArticleSummaries(summaries);
        setIsLoading(false);
        setNumPages(Math.ceil(count / 10));
        setPage(() => {
          if (searchParams.get("page")) {
            return parseInt(searchParams.get("page"));
          } else {
            return 1;
          }
        });
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") setError400(true);
      });
  }, [searchParams]);

  function queryUpdater({ set_sort_by, set_order, set_page }) {
    setSearchParams((currentSearchParams) => {
      let newParams = {};
      for (const key of currentSearchParams.keys()) {
        if (currentSearchParams.get(key)) {
          newParams[key] = currentSearchParams.get(key);
        }
      }
      if (set_sort_by) newParams.sort_by = set_sort_by;
      if (set_order) newParams.order = set_order;
      if (set_page) newParams.page = set_page;
      return newParams;
    });
  }

  if (error400)
    return <Error code="400" message="Those queries aren't valid" />;

  if (isLoading) return <h2>Loading...</h2>;

  const pageBar = () => {
    let items = [];
    for (let i = 1; i <= numPages; i++) {
      console.log(page);
      items.push(
        <Pagination.Item
          onClick={() => {
            setPage(i);
            queryUpdater({ set_page: i });
          }}
          key={`page-btn-${i}`}
          active={i === page}
        >
          {i}
        </Pagination.Item>
      );
    }

    return <Pagination className="page-bar">{items}</Pagination>;
  };

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
      {pageBar()}
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
      {pageBar()}
    </>
  );
};
