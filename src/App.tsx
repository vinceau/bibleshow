import * as React from "react";
import { Provider } from "unstated";

import "./App.scss";

import { Screen } from "./components/Screen";

class App extends React.Component {
  public render() {
    return (
      <Provider>
        <div className="App">
          <Screen />
        </div>
      </Provider>
    );
  }
}

export default App;
