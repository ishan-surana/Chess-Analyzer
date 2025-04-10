import { Table } from "reactstrap";
import { useEffect, useState } from "react";
import "./Results.css";

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`http://localhost:5000/api/matches/${userId}`);
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching match data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [userId]);

  return (
    <div className="results-container">
      <h2>Results for UserID: {userId}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No match history found.</p>
      ) : (
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Opponent ID</th>
              <th>Worst Move No.</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((row, index) => (
              <tr key={row._id || index}>
                <td>{index + 1}</td>
                <td>{row.opponentId}</td>
                <td>{row.worstMove}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default Results;
