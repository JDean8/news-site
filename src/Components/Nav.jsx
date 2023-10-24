import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <nav>
      <Link to="/articles">Articles</Link>
      <p>Logged in as: {user}</p>
    </nav>
  );
};
