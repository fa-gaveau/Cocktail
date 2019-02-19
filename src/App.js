import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />/
      </Switch>
    );
  }
}

export default App;
