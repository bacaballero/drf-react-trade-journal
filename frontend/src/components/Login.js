import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    return await fetch("/api/auth/login/", requestOptions)
      .then((response) => console.log(response.json()))
      ///.then((token) => setToken(token))
      .then(navigate("/"));
  };

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}
