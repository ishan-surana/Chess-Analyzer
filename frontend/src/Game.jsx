import "./Game.css";
import { useEffect, useState } from "react";
import { Navbar, Nav, NavItem, NavLink, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";

const Game = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [viewRoomId, setViewRoomId] = useState("");

  useEffect(() => {
    setTimeout(() => setAnimate(true), 1000);
  }, []);

  const handleStart = () => {
    const roomId = uuidv4();
    navigate(`/play?roomId=${roomId}&role=player&color=white`);
  };

  const handleJoin = () => {
    if (joinRoomId.trim()) {
      navigate(`/play?roomId=${joinRoomId}&role=player&color=black`);
    } else {
      alert("Please enter a room ID to join.");
    }
  };

  const handleWatch = () => {
    if (viewRoomId.trim()) {
      navigate(`/play?roomId=${viewRoomId}&role=watcher`);
    } else {
      alert("Please enter a room ID to watch.");
    }
  };

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
            <Button className="nav-button" onClick={handleStart}>Start Match</Button>
          </NavItem>
          <NavItem>
            <Input
              className="room-input"
              placeholder="Enter Room ID to Join"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
            />
            <Button className="nav-button" onClick={handleJoin}>Join Match</Button>
          </NavItem>
          <NavItem>
            <Input
              className="room-input"
              placeholder="Enter Room ID to Watch"
              value={viewRoomId}
              onChange={(e) => setViewRoomId(e.target.value)}
            />
            <Button className="nav-button" onClick={handleWatch}>Watch Match</Button>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Game;
