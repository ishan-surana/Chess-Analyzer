import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; 

const LoginPage = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, password }),
    });

    if (res.ok) {
      localStorage.setItem("userId", userId);
      const data = await res.json();
      navigate("/home");
    } else {
      const err = await res.json();
      alert(err.message || "Invalid credentials!");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Server error. Try again later.");
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
