import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  HashRouter as Router,
  //BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Front from './Front'
import testReading from './testReading'
import RtestBackend from './testBackend'
import Test from './Test'

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Front} />
          <Route exact path="/read" component={testReading} />
          <Route excat path="/backend" render={(props) => <RtestBackend selected="1"/>} />

          <Route path={`/fault/:id`}>
            <Test />
          </Route>

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
