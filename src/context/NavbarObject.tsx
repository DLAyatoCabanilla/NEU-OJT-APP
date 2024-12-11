import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavbarObject() {
  return (
    <Navbar className="shadow bg-light p-2 pt-3 pb-3">
      <Container>
        <Navbar.Brand href="#home">Navbar Placeholder</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>test only</Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarObject;
