import "./LandingPage.css"; 
import bigImage from "./assets/LandingPageIMG.jpeg";
import { Navbar, Nav, NavItem, NavLink, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId") || "";

  return (
    <div className="landing-container">
 
      <Navbar className="navbar">
        <Nav className="nav-links">
          <NavItem>
            <Button className="nav-button" onClick={() => { localStorage.clear(); navigate("/"); }}>Signout</Button>
          </NavItem>
          <NavItem>
            <Button className="nav-button" onClick={() => navigate("/game")}>Game</Button>
          </NavItem>
          <NavItem>
            <Button className="nav-button" onClick={() => navigate(`/results`)}>Results</Button>
          </NavItem>
        </Nav>
      </Navbar>

      <div className="image-container">
        <img src={bigImage} alt="Landing Page" className="landing-image" />
      </div>

      <footer className="footer">HI</footer>
    </div>
  );
};  

export default LandingPage;
