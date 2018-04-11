import React, { Component } from 'react';
import './App.css';

// COMPONENTS
import Header from '../../components/Header';

// CONTAINERS
import Main from '../Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
