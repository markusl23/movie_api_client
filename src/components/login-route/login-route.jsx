import { Navigate, useLocation } from "react-router-dom";

export const LoginRoute = ({ token, onLoggedIn }) => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (token) {
    return <Navigate to={from} replace />;
  }

  return (
    <Row className="justify-content-md-center">
      <Col md={5}>
        <h2>Existing user login:</h2>
        <LoginView onLoggedIn={onLoggedIn} />
      </Col>
    </Row>
  );
};
