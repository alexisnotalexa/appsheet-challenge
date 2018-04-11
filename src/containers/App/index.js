import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

// UTILS
import { getAllIds } from '../../utils/users.js';

class App extends Component {
  constructor() {
    super();

    // functions
    this.findDatasetLength = this.findDatasetLength.bind(this);
  }

  componentDidMount() {
    this.findDatasetLength();
  }

  findDatasetLength() {
    getAllIds('https://appsheettest1.azurewebsites.net/sample/list')
      .then((ids) => {
        return ids.map(id => {
          return axios.get(`https://appsheettest1.azurewebsites.net/sample/detail/${id}`)
            .catch(err => {
              console.log(err);
            });
        });
      }).then(promises => {
        return axios.all(promises);
      }).then(results => {
        return results.map(user => {
          return user ? user.data : false;
        });
      }).then(users => {
        console.log(users);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
