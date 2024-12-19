import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import NavBar from './components/utils/NavBar';
import HomePage from './components/HomePage';
import PageNotFoundError from './components/error_pages/PageNotFoundError';

{/* <div className="d-flex flex-column" style={{ minHeight: '90vh', background: '#EFEFEF' }}> */}
export default function App() {
  return (
    <>
      <NavBar />
      {/* <Container fluid="" style={{background: '#EFEFEF', paddingTop: '5vh'}}> */}
      <div className="d-flex  flex-column" style={{ display: 'flex', minHeight: '85vh', minWidth: '100%', background: '#EFEFEF', paddingTop: '1vh'}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/game/math-racer" />} />
            <Route path="game/math-racer" element={<HomePage />} />
            <Route path="*" element={<PageNotFoundError />} />
          </Routes>
        </BrowserRouter>
      </div>
      {/* <Footer url={'saeedarham100@gmail.com'} /> */}
    </>
  );
}
