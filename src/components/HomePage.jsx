import React from 'react';
import Container from 'react-bootstrap/Container';
import GameBoard from './GameBoard';

export default function HomePage() {
  return (
    <Container fluid>
      <GameBoard />
    </Container>
  );
}