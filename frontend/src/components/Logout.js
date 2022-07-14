import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthDispatch, useAuthState, logout } from "../Context";

export default function Logout() {
  const navigate = useNavigate();
  const userDetails = useAuthState();
  const dispatch = useAuthDispatch(); // read dispatch method from context
  console.log(userDetails.token);
  const handleLogout = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userDetails.token}`,
      },
      credentials: "include",
    };
    try {
      return await fetch("/api/auth/logout/", requestOptions)
        .then((response) => console.log(response.json()))
        .then(() => logout(dispatch))
        .then(() => navigate("/"));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    return handleLogout;
  }, []);
}
