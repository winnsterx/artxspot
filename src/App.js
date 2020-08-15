import React from "react";
import axios from "axios";

import { Button } from "antd";

import "./App.css";

// The ReactDOM is rendering <App/> in index.js

function App() {
  const [auth, setAuth] = useState(0);

  function requestAccess() {
    axios
      .get("/login")
      .then(function (response) {
        console.log("login response:");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <Button type="primary" onClick={requestAccess}>
        Grant Spotify Permission
      </Button>
    </div>
  );
}

export default App;
