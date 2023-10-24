import { ArticleList } from "./Components/ArticleList";
import { Routes, Route } from "react-router-dom";
import { Article } from "./Components/SingleArticle";
import { NewsSiteNav } from "./Components/NewsSiteNav";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <NewsSiteNav />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
