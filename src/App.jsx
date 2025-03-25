import { useState } from 'react'
import ChessBoard from './chessboard'
import './App.css'
import ChessBoardd from './Chessboardd'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import Game from "./Game";
import Results from "./Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
        <Route path="/Chessboardd" element={<ChessBoardd/>} />
      </Routes>
    </Router>
  );
}

export default App
