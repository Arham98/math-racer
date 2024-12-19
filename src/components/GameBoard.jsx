import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../index.css";

export default function GameBoard() {
  // Declare state variables for positions of the players' cars
  const [player1Position, setPlayer1Position] = useState(2); // Positions: 1-3 reserved for Player 1
  const [player2Position, setPlayer2Position] = useState(5); // Positions: 4-6 reserved for Player 2/AI
  
  // Declare state variables for speed of the players' cars
  const [player1Speed, setPlayer1Speed] = useState(80);
  const [player2Speed, setPlayer2Speed] = useState(80);
  
  // Declare state variables for distance of the players' cars
  const [player1Distance, setPlayer1Distance] = useState(0.0);
  const [player2Distance, setPlayer2Distance] = useState(0.0);
  
  // Declare state variables for speed modifiers
  const [modifiers, setModifiers] = useState([]);
  const [modifierPosition, setModifierPosition] = useState(100);
  
  // Winner pop-up state variables
  const [winner, setWinner] = useState('');
  const [gameTied, setGameTied] = useState(false);
  const [show, setShow] = useState(false);
  function handleShow() {
    setShow(true);
  }
  const [game, setGame] = useState(true);

  // Start new game and close pop-up
  function handleClose() {
    setShow(false)
    setPlayer1Distance(0.0);
    setPlayer2Distance(0.0);
    setPlayer1Position(2);
    setPlayer2Position(5);
    setPlayer1Speed(80);
    setPlayer2Speed(80);
    setGame(true);
    setGameTied(false);

    const lane1 = gererateModValues();
    const lane2 = gererateModValues();
    const lane3 = gererateModValues();
    setModifiers([lane1, lane2, lane3, lane1, lane2, lane3]);
    setModifierPosition(1);
  };

  // Function for handling key controls for players
  function handleKeyPress(e) {
    if (e.key === "a" || e.key === "A") {
      setPlayer1Position((pos) => Math.max(1, pos - 1));
    } else if (e.key === "d" || e.key === "D") {
      setPlayer1Position((pos) => Math.min(3, pos + 1));
    } else if (e.key === "ArrowLeft") {
      setPlayer2Position((pos) => Math.max(4, pos - 1));
    } else if (e.key === "ArrowRight") {
      setPlayer2Position((pos) => Math.min(6, pos + 1));
    }
  };

  // Function to announce winner
  function winnerFunc(gameWinner) {
    if (gameWinner === '0')
      setGameTied(true);
    else
      setWinner(`Player ${gameWinner}`);
    setGame(false);
    handleShow();
  }

  // Function to generate modifier value
  function gererateModValues() {
    const val1 = Math.floor(Math.random() * 50) + 1;
    const val2 = Math.floor(Math.random() * 50) + 1;
    const symbols = ['+', '-', '*', '/'];
    const rndmIndBase2 = (Math.random() >= 0.5) ? 0 : 1;

    let sym = symbols[rndmIndBase2];
    if (val1 < 10 && val2 < 10) {
      sym = symbols[rndmIndBase2 + 2]
    }
    let mathRes = 0;
    if (sym === '+') 
      mathRes = val1 + val2;
    else if (sym === '-')
      mathRes = val1 - val2;
    else if (sym === '*')
      mathRes = val1 * val2;
    else if (sym === '/')
      mathRes = val1 / val2;
    let res = {expression: `${val1} ${sym} ${val2}`, value: mathRes};
    res = {expression: `-100`, value: -100};
    return res;
  }

  // Simulate distance covered
  useEffect(() => {
    const totalGameDistance = 50;
    if (player1Distance >= totalGameDistance) {
      if (player1Distance === player2Distance)
        winnerFunc('0');
      else
        winnerFunc('1');
    } else if (player2Distance >= totalGameDistance) {
      winnerFunc('2');
    }
    if (game) {
      const interval = setInterval(() => {
        setPlayer1Distance(player1Distance + (0.05 * player1Speed));
        setPlayer2Distance(player2Distance + (0.05 * player2Speed));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [player1Distance]);

  // Generate initial speed modifiers
  useEffect(() => {
    // Move modifiers down
    if (game) {
      const interval = setInterval(() => {
        setModifierPosition((prev) => (prev > 13 ? prev : prev + 1));
      }, 1000 - Math.min(450, (player1Speed+player1Speed) / 2));

      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  // Generate initial speed modifiers
  useEffect(() => {
    if (modifierPosition>13 && game) {
      if (modifiers.length > 0) {
        const speed1Mod = player1Position - 1;
        const speed2Mod = player2Position - 4;
        setPlayer1Speed((prev) => (Math.max(prev + modifiers[speed1Mod].value, 10)));
        setPlayer2Speed((prev) => (Math.max(prev + modifiers[speed2Mod].value, 10)));
      }

      const lane1 = gererateModValues();
      const lane2 = gererateModValues();
      const lane3 = gererateModValues();
      setModifiers([lane1, lane2, lane3, lane1, lane2, lane3]);
      setModifierPosition(1);
    }
  }, [modifierPosition]);

  // Listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <Container fluid style={{maxWidth: '100%'}}>
      <Row>
        <Col xs={1}>
          <div className="player-info">
            <h3 style={{fontSize: '20px', fontWeight: 'bold'}}>Player 1</h3>
            <p><strong>Speed:</strong></p>
            <p>{Math.round(player1Speed * 100) / 100} km/h</p>
            <p><strong>Distance:</strong></p>
            <p>{Math.round(player1Distance * 100) / 100} km</p>
          </div>
        </Col>
        <Col lg={10}>
          <div className="road-container">
            <div className="road">
              {[1, 2, 3, 4, 5, 6].map((lane) => (
                <div key={lane} className="lane">
                  {lane === player1Position && <div className="car player1"></div>}
                  {lane === player2Position && <div className="car player2"></div>}
                  {modifiers.length > 0 && <div
                    style={{
                        position: "absolute",
                        top: `${modifierPosition*40}px`,
                        left: `25%`,
                    }}
                  >
                    <Button disabled variant="light">{modifiers[lane-1].expression}</Button>
                  </div>}
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col xs={1}>
        <div className="player-info">
            <h3 style={{fontSize: '20px', fontWeight: 'bold'}}>Player 2</h3>
            <p><strong>Speed:</strong></p>
            <p>{Math.round(player2Speed * 100) / 100} km/h</p>
            <p><strong>Distance:</strong></p>
            <p>{Math.round(player2Distance * 100) / 100} km</p>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        {!gameTied && <Modal.Body style={{color: 'black'}}>{winner} won the 1000 km race!</Modal.Body>}
        {gameTied && <Modal.Body style={{color: 'black'}}>Game tied!</Modal.Body>}
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            New Game
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};