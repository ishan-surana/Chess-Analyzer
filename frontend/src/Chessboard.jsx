import { useState } from "react";
import { Button, Alert, Input } from "reactstrap";
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

// Chess piece mapping
const pieceMap = {
  "P": w_pawn, "R": w_rook, "N": w_knight, "B": w_bishop, "Q": w_queen, "K": w_king,
  "p": b_pawn, "r": b_rook, "n": b_knight, "b": b_bishop, "q": b_queen, "k": b_king
};

// Initial board setup
const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const ChessBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [from, setFrom] = useState(null);
  const [turn, setTurn] = useState("white");
  const [moveLog, setMoveLog] = useState([]);
  const [resigned, setResigned] = useState(false);
  const [moveText, setMoveText] = useState("");

  const validatePawnMove = (from, to, board, piece) => {
    const direction = piece === "P" ? -1 : 1;
    const startRow = piece === "P" ? 6 : 1;
  
    if (to.row === from.row + direction && to.col === from.col && board[to.row][to.col] === "") {
      return true;
    }
  
    if (from.row === startRow && to.row === from.row + 2 * direction && to.col === from.col && board[to.row][to.col] === "") {
      return true;
    }
  
    if (to.row === from.row + direction && Math.abs(to.col - from.col) === 1 && board[to.row][to.col] !== "") {
      return true;
    }
  
    return false;
  };

  const validateKnightMove = (from, to) => {
    const dx = Math.abs(to.col - from.col);
    const dy = Math.abs(to.row - from.row);
    return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
  };

  const validateBishopMove = (from, to, board) => {
    if (Math.abs(to.col - from.col) !== Math.abs(to.row - from.row)) return false;
    return isPathClear(from, to, board);
  };

  const validateRookMove = (from, to, board) => {
    if (from.row !== to.row && from.col !== to.col) return false;
    return isPathClear(from, to, board);
  };

  const validateQueenMove = (from, to, board) => {
    return validateBishopMove(from, to, board) || validateRookMove(from, to, board);
  };
  const validateKingMove = (from, to) => {
    return Math.abs(to.row - from.row) <= 1 && Math.abs(to.col - from.col) <= 1;
  };
  const isPathClear = (from, to, board) => {
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
      
  const isValidMove = (from, to, board) => {
    const { row: fromRow, col: fromCol } = from;
    const { row: toRow, col: toCol } = to;
    const piece = board[fromRow][fromCol];
    const target = board[toRow][toCol];
  
    if ((piece.match(/[PRNBQK]/) && target.match(/[PRNBQK]/)) || 
        (piece.match(/[prnbqk]/) && target.match(/[prnbqk]/))) {
      return false;
    }
  
    switch (piece.toLowerCase()) {
      case "p": return validatePawnMove(from, to, board, piece);
      case "n": return validateKnightMove(from, to);
      case "b": return validateBishopMove(from, to, board);
      case "r": return validateRookMove(from, to, board);
      case "q": return validateQueenMove(from, to, board);
      case "k": return validateKingMove(from, to);
      default: return false;
    }
  };

  
  const handleClick = (row, col) => {
    const piece = board[row][col];
  
    if (!from) {
      if ((turn === "white" && piece.match(/[PRNBQK]/)) || 
          (turn === "black" && piece.match(/[prnbqk]/))) {
        setFrom({ row, col });
      }
    } else {
      const to = { row, col };
  
      if (isValidMove(from, to, board)) {
        let newBoard = board.map((r) => [...r]);
        newBoard[row][col] = board[from.row][from.col];
        newBoard[from.row][from.col] = "";
        setBoard(newBoard);
        console.log("Board after move:");
        console.table(newBoard);

        const moveNotation = `${"abcdefgh"[from.col]}${8 - from.row} → ${"abcdefgh"[col]}${8 - row}`;
        setMoveLog([...moveLog, moveNotation]);
        console.log("Move History:", [...moveLog, moveNotation]);
        setTurn(turn === "white" ? "black" : "white");
      }
      setFrom(null);
    }
  };
  

  const handleTakeback = () => {
    if (moveLog.length > 0) {
      setMoveLog(moveLog.slice(0, -1)); 
    }
  };

  const handleResign = () => {
    setResigned(true);
    setMoveText("Move 4");
  };

  const handleWorstMove = () => {
    if (!resigned) {
      alert("Game in progress");
    }
  };

  return (
    <div className="container">
      <div className="chessboard-container">
        <div className="chessboard">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              const file = "abcdefgh"[colIndex]; 
              const rank = 8 - rowIndex; 

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="square"
                  onClick={() => handleClick(rowIndex, colIndex)}
                  style={{ backgroundColor: isDark ? "#769656" : "#eeeed2" }}
                >
 
                  {colIndex === 0 && <span className="rank">{rank}</span>}
                  {rowIndex === 7 && <span className="file">{file}</span>}


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
        <Button color="danger" onClick={handleResign}>Resign</Button>
        <Button color="warning" onClick={handleWorstMove} disabled={!resigned}>
          Show the worst move
        </Button>
        <Input type="text" value={moveText} readOnly />
      </div>
    </div>
  );
};

export default ChessBoard;
