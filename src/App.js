/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home';
import DroneState from './components/DroneState';


function App() {
  return (
    <>
      <Router>
        <Navbar />
      </Router>    
      <DroneState/>
      <Home />
    </>
  );
}

export default App;
