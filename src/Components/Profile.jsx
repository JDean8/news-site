import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export const Profile = () => {
  const { user, userFriendlyName, userImg, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    setUser("");
  };

  return (
    <Card className="profile-card">
      <Card.Img variant="top" src={userImg} />
      <Card.Body>
        <Card.Title>{userFriendlyName}</Card.Title>
        <Card.Text>{user}</Card.Text>
        <Button onClick={handleSignOut} variant="danger">
          Sign Out
        </Button>
      </Card.Body>
    </Card>
  );
};
