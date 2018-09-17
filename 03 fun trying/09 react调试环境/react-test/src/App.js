import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './libs/jquery-latest';
import './libs/crypto-js';
import './libs/SecurityUtils';

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    console.log(window.encrypt)

    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <HashRouter>
          <div>
            <Switch>
              <Route path='/login' exact render={() => <div>login</div>} />
            </Switch>
            <Redirect to='/login'></Redirect>
          </div>
        </HashRouter>
        
      </div>
    );
  }
}

export default App;
