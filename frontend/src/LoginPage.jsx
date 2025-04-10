import { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Alert } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("info");
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
        await res.json();
        navigate("/home");
      } else {
        const err = await res.json();
        setAlertMessage(err.message || "Invalid credentials!");
        setAlertColor("danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlertMessage("Server error. Try again later.");
      setAlertColor("danger");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      if (res.ok) {
        setAlertMessage("Signup successful! You can now log in.");
        setAlertColor("success");
      } else if (res.status === 400) {
        setAlertMessage("User already exists!");
        setAlertColor("warning");
      } else {
        const err = await res.json();
        setAlertMessage(err.message || "Signup failed!");
        setAlertColor("danger");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setAlertMessage("Server error. Try again later.");
      setAlertColor("danger");
    }
  };

  return (
    <div className="login-container">
      <Container className="login-box">
        <div className="inner-container">
          <h2>Signup</h2>

          {alertMessage && (
            <Alert color={alertColor} toggle={() => setAlertMessage("")}>
              {alertMessage}
            </Alert>
          )}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <FormGroup className="form-group">
              <Label for="userId">User ID:</Label>
              <Input type="text" id="userId" value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </FormGroup>
            <FormGroup className="form-group">
              <Label for="password">Password:</Label>
              <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormGroup>
            <div className="button-group">
              <Button color="primary" type="submit">Login</Button>
              <Button color="secondary" type="button" onClick={handleSignup}>Signup</Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
