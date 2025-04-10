import { useState } from 'react'
import './App.css'
import ChessBoard from './Chessboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import Game from "./Game";
import Results from "./Results";
import RequireAuth from "./RequireAuth";

function App() {
  return (
    <Router>
<Routes>
  <Route path="/" element={<LoginPage />} />
  <Route path="/home" element={<RequireAuth><LandingPage /></RequireAuth>} />
  <Route path="/game" element={<RequireAuth><Game /></RequireAuth>} />
  <Route path="/results" element={<RequireAuth><Results /></RequireAuth>} />
  <Route path="/play" element={<RequireAuth><ChessBoard /></RequireAuth>} />
</Routes>
    </Router>
  );
}

export default App
