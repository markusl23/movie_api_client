import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export const NavigationBar = () => {
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
                    <Navbar.Text>
                      Signed in as: <strong>{currentUser}</strong>
                  </Navbar.Text>
                  <Nav.Link href="#action1">User Profile</Nav.Link>
                  <Nav.Link href="#action2">Log out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};