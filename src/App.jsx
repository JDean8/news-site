import { ArticleList } from "./Components/ArticleList";
import { Routes, Route } from "react-router-dom";
import { Article } from "./Components/SingleArticle";
import { NewsSiteNav } from "./Components/NewsSiteNav";
import "bootstrap/dist/css/bootstrap.min.css";
import { Error } from "./Components/Error";

function App() {
  return (
    <>
      <NewsSiteNav />
      <Routes>
        <Route path="/" element={<p>Welcome</p>} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
