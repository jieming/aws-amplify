import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Cloudtop!</h2>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
