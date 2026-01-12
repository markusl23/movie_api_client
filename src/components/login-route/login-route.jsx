import { Navigate, useLocation } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginView } from '../login-view/login-view';

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
