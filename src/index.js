import React from "react";

import "./index.css";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.0.0";
import "./assets/demo/demo.css";

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import bolClientInstance from "./client/bolClient";
import BolContext from "./bolContext";

import { createRoot } from "react-dom/client";

global.Buffer = global.Buffer || require("buffer").Buffer;

await bolClientInstance.initialize();

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <BolContext.Provider value={bolClientInstance}>
    <App />
  </BolContext.Provider>
);

serviceWorker.unregister();
