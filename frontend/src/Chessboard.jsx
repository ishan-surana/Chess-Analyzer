import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { io } from "socket.io-client";
import "./Chessboard.css";

import w_pawn from "./assets/w_pawn.png";
import w_rook from "./assets/w_rook.png";
import w_knight from "./assets/w_knight.png";
import w_bishop from "./assets/w_bishop.png";
import w_queen from "./assets/w_queen.png";
import w_king from "./assets/w_king.png";
import b_pawn from "./assets/b_pawn.png";
import b_rook from "./assets/b_rook.png";
import b_knight from "./assets/b_knight.png";
import b_bishop from "./assets/b_bishop.png";
import b_queen from "./assets/b_queen.png";
import b_king from "./assets/b_king.png";

const pieceMap = {
  P: w_pawn, R: w_rook, N: w_knight, B: w_bishop, Q: w_queen, K: w_king,
  p: b_pawn, r: b_rook, n: b_knight, b: b_bishop, q: b_queen, k: b_king,
};

const defaultBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const socket = io("http://localhost:5000");

const getSavedGame = (roomId) => {
  const data = localStorage.getItem(`chess-${roomId}`);
  return data ? JSON.parse(data) : null;
};

const saveGame = (roomId, board, turn, log) => {
  localStorage.setItem(`chess-${roomId}`, JSON.stringify({ board, turn, log }));
};

const ChessBoard = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const role = searchParams.get("role") || "player";
  const color = searchParams.get("color") || "white";

  const [board, setBoard] = useState(defaultBoard);
  const [from, setFrom] = useState(null);
  const [turn, setTurn] = useState("white");
  const [moveLog, setMoveLog] = useState([]);
  const [resigned, setResigned] = useState(false);
  const [moveText, setMoveText] = useState("");

  useEffect(() => {
    const localGame = getSavedGame(roomId);
    if (localGame) {
      setBoard(localGame.board);
      setTurn(localGame.turn);
      setMoveLog(localGame.log);
    }

    socket.emit("join-game", roomId);

    socket.on("opponent-move", ({ from, to, piece, fullBoard, log, turn, senderId }) => {
      if (senderId === socket.id) return;
      if(!fullBoard) return;
      applyMove(from, to, true, piece, fullBoard, log, turn);
    });

    socket.on("sync-request", ({ requesterId }) => {
      socket.emit("send-sync", {
        roomId,
        toSocketId: requesterId,
        fullBoard: board,
        log: moveLog,
        turn
      });
    });

    socket.on("sync-board", ({ fullBoard, log, turn }) => {
      setBoard(fullBoard);
      setMoveLog(log);
      setTurn(turn);
      saveGame(roomId, fullBoard, turn, log);
    });

    socket.on("opponent-resigned", (resignerColor) => {
      setResigned(true);
      setMoveText(`${resignerColor} resigned. ${resignerColor === "white" ? "Black" : "White"} wins!`);
      setMoveLog((prev) => [...prev, `${resignerColor} resigned`]);
    });

    if (!localGame && role === "watcher") {
      socket.emit("request-board", roomId);
    }

    return () => {
      socket.off("opponent-move");
      socket.off("sync-request");
      socket.off("sync-board");
      socket.off("opponent-resigned");
    };
  }, [roomId, role]);

  const isPathClear = (from, to) => {
    let rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    let colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    let row = from.row + rowStep;
    let col = from.col + colStep;
    while (row !== to.row || col !== to.col) {
      if (board[row][col] !== "") return false;
      row += rowStep;
      col += colStep;
    }
    return true;
  };

  const validatePawnMove = (from, to, piece) => {
    const dir = piece === "P" ? -1 : 1;
    const startRow = piece === "P" ? 6 : 1;
    if (to.row === from.row + dir && to.col === from.col && board[to.row][to.col] === "") return true;
    if (from.row === startRow && to.row === from.row + 2 * dir && to.col === from.col && board[to.row][to.col] === "") return true;
    if (to.row === from.row + dir && Math.abs(to.col - from.col) === 1 && board[to.row][to.col] !== "") return true;
    return false;
  };

  const validateMove = (from, to, piece) => {
    const dx = Math.abs(to.col - from.col);
    const dy = Math.abs(to.row - from.row);
    switch (piece.toLowerCase()) {
      case "p": return validatePawnMove(from, to, piece);
      case "n": return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
      case "b": return dx === dy && isPathClear(from, to);
      case "r": return (dx === 0 || dy === 0) && isPathClear(from, to);
      case "q": return (dx === dy || dx === 0 || dy === 0) && isPathClear(from, to);
      case "k": return dx <= 1 && dy <= 1;
      default: return false;
    }
  };

  const applyMove = (from, to, isOpponent = false, piece = null, fullBoard = null, logOverride = null, turnOverride = null) => {
    const newBoard = fullBoard || board.map(row => [...row]);
    const movingPiece = piece || newBoard[from.row][from.col];
    newBoard[to.row][to.col] = movingPiece;
    newBoard[from.row][from.col] = "";

    const moveNotation = `${"abcdefgh"[from.col]}${8 - from.row} → ${"abcdefgh"[to.col]}${8 - to.row}`;
    const updatedLog = logOverride || [...moveLog, isOpponent ? `Opponent: ${moveNotation}` : moveNotation];
    const updatedTurn = turnOverride || (turn === "white" ? "black" : "white");

    setBoard(newBoard);
    setMoveLog(updatedLog);
    setTurn(updatedTurn);
    saveGame(roomId, newBoard, updatedTurn, updatedLog);
  };

  const handleClick = (row, col) => {
    if (role === "watcher") return;
    if (turn !== color) return;
    const piece = board[row][col];
    if (!from) {
      const isMyTurn = (turn === color);
      const isMyPiece = (color === "white" ? piece.match(/[PRNBQK]/) : piece.match(/[prnbqk]/));
      if (isMyTurn && isMyPiece) {
        setFrom({ row, col });
      }
    } else {
      const to = { row, col };
      const movingPiece = board[from.row][from.col];
      if (validateMove(from, to, movingPiece)) {
        const newBoard = board.map(row => [...row]);
        newBoard[to.row][to.col] = movingPiece;
        newBoard[from.row][from.col] = "";

        const moveNotation = `${"abcdefgh"[from.col]}${8 - from.row} → ${"abcdefgh"[to.col]}${8 - to.row}`;
        const updatedLog = [...moveLog, moveNotation];

        applyMove(from, to);
        socket.emit("move", {
          roomId,
          from,
          to,
          piece: movingPiece,
          fullBoard: newBoard,
          log: updatedLog,
          turn: turn === "white" ? "black" : "white",
          senderId: socket.id
        });
      }
      setFrom(null);
    }
  };

  return (
    <div className="container">
      <div className="chessboard-container">
        <div className="chessboard">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="square"
                  onClick={() => handleClick(rowIndex, colIndex)}
                  style={{ backgroundColor: isDark ? "#769656" : "#eeeed2" }}
                >
                  {colIndex === 0 && <span className="rank">{8 - rowIndex}</span>}
                  {rowIndex === 7 && <span className="file">{"abcdefgh"[colIndex]}</span>}
                  {cell && <img src={pieceMap[cell]} alt={cell} className="piece" />}
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="sidebar">
        <h3>Move Log</h3>
        <div className="move-log">
          {moveLog.map((move, index) => (
            <p key={index}>{index + 1}. {move}</p>
          ))}
        </div>
        <Button color="danger" disabled={resigned} onClick={() => {
    socket.emit("resign", { roomId, color });
    setResigned(true);
    setMoveText(`${color === "white" ? "White" : "Black"} resigned. ${color === "white" ? "Black" : "White"} wins!`);
    setMoveLog((prev) => [...prev, `${color} resigned`]);
  }}>Resign</Button>
        <Button color="warning" disabled={!resigned}>Show the worst move</Button>
        <Input type="text" value={moveText} readOnly />
      </div>
    </div>
  );
};

export default ChessBoard;
