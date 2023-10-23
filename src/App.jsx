import { useEffect, useState } from "react";
import { Header } from "./Components/Header";
import { ArticleCard } from "./Components/ArticleCard";
import { getArticles } from "./utils/articles_api";

function App() {
  const [articles, setArticles] = useState([{}]);

  useEffect(() => {
    getArticles().then((articles) => {
      setArticles(articles);
    });
  }, []);

  return (
    <>
      <Header />
      {articles.map((article) => {
        return (
          <ArticleCard
            key={`article-card-${article.article_id}`}
            article={article}
          />
        );
      })}
    </>
  );
}

export default App;
