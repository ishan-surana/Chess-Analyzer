import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 
const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (userId === "220911270" && password === "Atharva") {
        navigate("/landingpage");
      } else {
        alert("Invalid credentials!");
      }
    };
  
    return (
      <div className="login-container">
        <Container className="login-box">
          <div className="inner-container">
            <h2>Signup</h2>
            <Form>
              <FormGroup className="form-group">
                <Label for="userId">User ID:</Label>
                <Input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="password">Password:</Label>
                <Input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <div className="button-group">
                <Button color="primary" onClick={handleLogin}>Login</Button>
                <Button color="primary">Signup</Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
    );
  };
  

export default LoginPage;
