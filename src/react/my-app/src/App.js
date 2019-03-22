import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import OneMovie from './Compos/OneMovie'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>DENZEL MOVIE</h1>
        <h3>Fetch a random movie</h3>
        <OneMovie/>
      </div>
    );
  }
}

export default App;
