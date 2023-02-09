import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const DashNav = (data) => {
  // console.log(data.xyz);

  return (
    // <div >
      <Navbar bg="light" expand="lg" className="">
        <Container>
          <Navbar.Brand href="#home"> hi {data.xyz}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#oreder">Orders</Nav.Link>
              <Nav.Link href="#">P&L</Nav.Link>              
              <Nav.Link href="/lout">Logout</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    // </div>
  )
}

export default DashNav