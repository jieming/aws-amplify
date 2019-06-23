import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { withAuthenticator } from "aws-amplify-react";
import { API } from "aws-amplify";

function App() {
  const [people, updatePeople] = useState([]);

  async function callApi() {
    try {
      const peopleData = await API.get("mainappapi", "/people");
      console.log("peopleData: ", peopleData);
      updatePeople(peopleData.people);

      const coinData = await API.get("mainappapi", "/coins");
      console.log("coinData: ", coinData);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Cloudtop!</h2>
        {people.map((people, i) => (
          <h2>{people.name}</h2>
        ))}
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
