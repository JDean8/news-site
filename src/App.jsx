import { Header } from "./Components/Header";
import { ArticleList } from "./Components/ArticleList";
import { Routes, Route } from "react-router-dom";
import { Article } from "./Components/SingleArticle";
import { Nav } from "./Components/Nav";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
