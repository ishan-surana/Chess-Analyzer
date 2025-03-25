import "./Game.css";
import { useEffect, useState } from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const Game = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 1000);
  }, []);

  return (
    <div className="game-container">
      <motion.div 
        className="background-image"
        initial={{ x: "-100%" }}
        animate={{ x: animate ? "0%" : "-100%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <Navbar className="game-navbar">
        <Nav className="game-nav">
          <NavItem>
            <NavLink className="nav-button" onClick={() => navigate("/Chessboardd")}>Start Match</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-button" onClick={() => navigate("/Chessboardd")}>Join Match</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-button" onClick={() => navigate("/Chessboardd")}>Watch Match</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Game;
