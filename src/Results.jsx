import { Table } from "reactstrap";
import "./Results.css";

const Results = () => {
  const userId = "220911270";
  const dummyData = [
    { matchId: 1, opponentId: 1001, worstMove: 4 },
    { matchId: 2, opponentId: 1002, worstMove: 6 },
    { matchId: 3, opponentId: 1003, worstMove: 3 },
    { matchId: 4, opponentId: 1004, worstMove: 7 },
    { matchId: 5, opponentId: 1005, worstMove: 2 },
  ];

  return (
    <div className="results-container">
      <h2>Results for UserID: {userId}</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Match ID</th>
            <th>Opponent ID</th>
            <th>Worst Move No.</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((row, index) => (
            <tr key={index}>
              <td>{row.matchId}</td>
              <td>{row.opponentId}</td>
              <td>{row.worstMove}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Results;