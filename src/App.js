import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import { connect } from "react-redux";
import { getUserAuth } from "./actions";

class App extends React.PureComponent {
  componentDidMount() {
    this.props.getUserAuth();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <>
                  <Header />
                  <Home />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, { getUserAuth })(App);
