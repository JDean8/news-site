import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { getTopics } from "../utils/topics_api";

export const NewsSiteNav = () => {
  const { user, userImg } = useContext(UserContext);
  const [topics, setTopics] = useState([{}]);

  useEffect(() => {
    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          News-site
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/articles">
              Articles
            </Nav.Link>
            <NavDropdown title="Topics" id="basic-nav-dropdown">
              {topics.map((topic) => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    to={`/articles?topic=${topic.slug}`}
                    key={`topic-${topic.slug}`}
                  >
                    {topic.slug}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link as={Link} to="/profile">
            <img className="avatar" src={userImg} /> {user}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
