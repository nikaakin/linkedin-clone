import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers";
import App from "./App";
import "./css/index.scss";

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
