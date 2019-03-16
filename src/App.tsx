import * as React from "react";
import { Provider } from "unstated";

import "./App.scss";

import { Screen } from "./components/Screen";

(window as any).SplitText = require("./lib/splittext");
(window as any).fits = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const top = rect.top + document.body.scrollTop;
  const left = rect.left + document.body.scrollLeft;
  const right = left + el.offsetWidth;
  const bottom = top + el.offsetHeight;
  const { clientWidth, clientHeight } = document.documentElement;
  return (clientHeight >= bottom && clientWidth >= right);
}

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
