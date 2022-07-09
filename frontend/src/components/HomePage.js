import React from "react";
import {
  BrowserRouter,
  Switch,
  Routes,
  Route,
  Link,
  Redirect,
  useNavigate,
} from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";
import { useAuthDispatch, logout, useAuthState } from "../Context";

export default function HomePage() {
  const dispatch = useAuthDispatch(); // read dispatch method from context
  const userDetails = useAuthState(); //read user details from context
  //console.log(userDetails);

  const handleLogout = () => {
    logout(dispatch); //call the logout action
  };

  const renderHomePage = () => {
    console.log(userDetails);
    return userDetails.user ? (
      <p>Homepage {userDetails.user.username}</p>
    ) : (
      <p>Homepage</p>
    );
  };
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
            <Nav.Link href="/api/auth/login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderHomePage()} />
          <Route path="/register" element={<Register />} />
          <Route path="/api/auth/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
