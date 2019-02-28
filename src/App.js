import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import Detail from './components/Detail';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Homepage} />/
        <Route exact path='/detail' component={Detail} />/
      </Switch>
    );
  }
}

export default App;
