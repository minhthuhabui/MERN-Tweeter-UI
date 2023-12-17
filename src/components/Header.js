import React, { useContext } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";

export default function Header() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  const signOut = () => {
    localStorage.removeItem("token");
    // Reset user to null
    dispatch({ type: "CURRENT_USER", payload: null });
  };
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">TWEETER</Link>
      </h1>
      <nav>
        <ul className="main-nav">
          {user ? (
            <>
              <li>
                <span className="user-name">Hello, {user.userName}</span>
              </li>
              <li onClick={() => signOut()}>
                <Link to="/">Sign out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
