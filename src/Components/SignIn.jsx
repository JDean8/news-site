import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { UserContext } from "../Context/UserContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../utils/users_api";

export const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const signInUser = (user) => {
    return getUser(user).then(() => {
      setUser(user);
      navigate("/");
    });
  };

  const login = (event) => {
    event.preventDefault();
    const loginError = document.getElementById("login-error");
    signInUser(event.target[0].value).catch((err) => {
      console.log(err);
      loginError.innerText = "Sign in failed";
    });
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand>News-site</Navbar.Brand>
      </Navbar>
      <Button
        className="demo-account"
        onClick={() => {
          signInUser("happyamy2016");
        }}
      >
        To use demo account click here
      </Button>
      <form className="sign-in-form" onSubmit={login}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <p id="login-error" className="error-text"></p>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};
