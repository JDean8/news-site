import { ArticleList } from "./Components/ArticleList";
import { Routes, Route, Navigate } from "react-router-dom";
import { Article } from "./Components/SingleArticle";
import { NewsSiteNav } from "./Components/NewsSiteNav";
import { Profile } from "./Components/Profile";
import { Error } from "./Components/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import { SignIn } from "./Components/SignIn";

function App() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <NewsSiteNav />
      <Routes>
        <Route path="/" element={<p>Welcome</p>} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<Article />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
