import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Front from './Front'
import Fault from './Fault'
import Fault2 from './Fault2'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Front} />
          <Route exact path="/fault" component={Fault} />
          <Route exact path="/fault2" component={Fault2} />
          <Route exact path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    );
  }
}

class NotFound extends Component {
  render() {
    return (
      <div>
        <h3>404 NOT FOUND</h3>
        <Link to="/">Click me to go back to homepage</Link>
      </div>
    );
  }
}

export default App;
