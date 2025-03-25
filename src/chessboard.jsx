import { useState } from "react";
import "./ChessBoard.css"; // Ensure styling

// Import PNGs (place these in the `src/assets` folder)
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
  "P": w_pawn, "R": w_rook, "N": w_knight, "B": w_bishop, "Q": w_queen, "K": w_king,
  "p": b_pawn, "r": b_rook, "n": b_knight, "b": b_bishop, "q": b_queen, "k": b_king
};


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

  const handleClick = (row, col) => {
    const piece = board[row][col];

    if (!from) {

      if ((turn === "white" && piece.match(/[PRNBQK]/)) ||
          (turn === "black" && piece.match(/[prnbqk]/))) {
        setFrom({ row, col });
      }
    } else {
      let newBoard = board.map((r) => [...r]);
      newBoard[row][col] = board[from.row][from.col];
      newBoard[from.row][from.col] = "";
      setBoard(newBoard);

      // Switch turns
      setTurn(turn === "white" ? "black" : "white");
      setFrom(null);
    }
  };

  return (
    <div className="chessboard">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          const file = "abcdefgh"[colIndex]; // File notation
          const rank = 8 - rowIndex; // Rank notation

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
  );
};

export default ChessBoard;
