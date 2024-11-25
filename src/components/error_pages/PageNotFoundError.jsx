import React from 'react';
import Container from 'react-bootstrap/Container';

export default function PageNotFoundError() {
  return (
    <Container className="center-container">
      <h3 className="text-title-color">404 Error</h3>
      <h3 className="text-title-color">The requested URL does not exist</h3>
    </Container>
  );
}