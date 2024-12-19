import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/Logo.png';

export default function NavBar() {
  return (
    <Navbar className="justify-content-start fixed-top navbar-color" variant="dark" expand="lg" style={{ height: '5vh' }}>
      <Container fluid>
        <Navbar.Brand className="text-navbar-title">
          <Nav.Link className="text-navbar" href="/menu">
            <h1 className="header-design-navbar">
              <b>
                <img alt="" src={logo} height="3vh" />
                {' '}
                Math Racer
              </b>
            </h1>
          </Nav.Link>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}