import { Link, useNavigate } from "react-router-dom";

export const Error = ({ message, code }) => {
  const navigate = useNavigate();
  if (!message) message = "Oops, it appears that page doesn't exist";
  if (!code) code = "404";

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h2>{code} error</h2>
      <p>{message}</p>
      <button className="btn-secondary" onClick={goBack}>
        Back to where you came from
      </button>
      <Link to="/">Back home</Link>
    </>
  );
};
