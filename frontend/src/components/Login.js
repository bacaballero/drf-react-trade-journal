import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginUser, useAuthState, useAuthDispatch } from "../Context";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();
  const { loading, errorMessage } = useAuthState(); //read the values of loading and errorMessage from context

  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = { username, password };
    try {
      let response = await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
      if (!response.user) return;
      navigate("/"); //navigate to homepage on success
    } catch (error) {
      console.log(error);
    }
  };
  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    try {
      return await fetch("/api/auth/login/", requestOptions).then(
        (response) => {
          console.log(response.json());
          if (response.ok) {
            navigate("/");
          } else {
            setErrorMsg("Invalid login credentials");
          }
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  */

  function AlertDismissible() {
    if (errorMessage) {
      return (
        <Alert variant="danger" dismissible>
          {errorMessage}
        </Alert>
      );
    }
  }

  return (
    <Container>
      <AlertDismissible />
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
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}
