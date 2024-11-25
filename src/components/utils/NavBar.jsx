import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../assets/Logo.png';

export default function NavBar({ type }) {
  return (
    <Navbar className="justify-content-start fixed-top navbar-color" variant="dark" expand="lg" style={{ height: '20vh' }}>
      <Container fluid>
        <Navbar.Brand className="text-navbar-title">
          <Nav.Link className="text-navbar" href="/menu">
            {(type === '')
              && (
                <h1 className="header-design-navbar">
                  <b>
                    <img alt="" src={logo} height="100vh" />
                    {' '}
                    Math Racer
                  </b>
                </h1>
              )}
            {(type !== '')
              && (
                <h1 className="header-design-navbar">
                  <b>
                    <img alt="" src={logo} height="100vh" />
                    {' '}
                    Cafe Luxuriae Menu
                  </b>
                </h1>
              )}
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          {(type === 'preview')
            && (
            <Button className="navbar-button" href="/menueditor">
              <p style={{ color: 'white', fontSize: '30px' }}>
                Edit Menu
              </p>
            </Button>
            )}
          {(type === 'editor')
            && (
            <Button className="navbar-button" href="/menu">
              <p style={{ color: 'white', fontSize: '30px' }}>
                Preview Menu
              </p>
            </Button>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  type: PropTypes.string,
};

NavBar.defaultProps = {
  type: '',
};