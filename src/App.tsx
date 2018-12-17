import * as React from "react";
import { Provider } from "unstated";

import "./App.scss";

import { Counter } from "./components/Counter";
import { Menu } from "./components/Menu";
import { Screen } from "./components/Screen";
import logo from "./logo.svg";

class App extends React.Component {
  public render() {
    return (
      <Provider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Counter />
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
          </p>
          <Menu />
          <Screen />
        </div>
      </Provider>
    );
  }
}

export default App;
