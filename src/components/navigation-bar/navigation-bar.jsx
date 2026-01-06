import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, token, onLoggedOut}) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="app-navbar mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Movie API Client</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}              
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Actions
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {!user && (
                    <>
                      <Nav.Link as={Link} to="/login">
                        Log in
                      </Nav.Link>
                      <Nav.Link as={Link} to="/signup">
                        Sign up
                      </Nav.Link>
                    </>
                  )}
                  {user && (
                    <>
                      <Nav.Link as={Link} to="/">
                        Home
                      </Nav.Link>
                      <Nav.Link onClick={onLoggedOut}>
                        Log out
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};