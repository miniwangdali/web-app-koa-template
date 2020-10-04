import React from "react";
import ReactDOM from "react-dom";
import Homepage from "./Containers/Homepage";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store";

import "./app.scss";

class App extends React.Component {
  render() {
    return (
      <ReduxProvider store={store}>
        <Router>
          <Homepage />
        </Router>
      </ReduxProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app-root"));
