import React from "react";
import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";

export default function HomePage({ token, setToken }) {
  function renderHomePage() {
    return <p>Homepage</p>;
  }
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Trade Journal</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/features">Features</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderHomePage()} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login token={token} setToken={setToken} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
