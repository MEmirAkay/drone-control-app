/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import Connection from './components/connection'
import Control from './components/control';
import Mission from './components/mission';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/connection' component={Connection} />
          <Route path='/control' component={Control} />
          <Route path='/mission' component={Mission} />
        </Switch>
      </Router>    
    </>
  );
}

export default App;
