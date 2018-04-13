import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';

// COMPONENTS
import Card from '../Card';

// UTILS
import { getAllIds } from '../../utils/users.js';

class Main extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      filter: 'Name',
      userList: false
    };

    // functions
    this.getUserData = this.getUserData.bind(this);
    this.getYoungestUsers = this.getYoungestUsers.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterUsersByAge = this.filterUsersByAge.bind(this);
    this.filterUsersByName = this.filterUsersByName.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    getAllIds('https://appsheettest1.azurewebsites.net/sample/list')
      .then((ids) => {
        // creates a array of promises returned from the api call
        return ids.map(id => {
          // calls the api based on the current id
          return axios.get(`https://appsheettest1.azurewebsites.net/sample/detail/${id}`)
            .catch(err => {
              // if any id's are invalid, print error
              console.log(err);
            });
        });
      })
      .then(promises => {
        // runs all the promises, returns api responses
        return axios.all(promises);
      })
      .then(results => {
        return results
        // filters out any invalid responses from api
        .filter(user => user)
        // creates new array with only user data
        .map(user => user.data);
      }).then(users => {
        this.getYoungestUsers(users);
      });
  }

  getYoungestUsers(users) {
    // valid phone number formats: (555)555-555, 555-555-5555, 555 555 5555, etc
    let validNumFormat = new RegExp(/^(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/g);
    // standardized phone number format: 555-555-5555
    let stndrdNumFormat = /^(\d{3})[-]?\d{3}[-]?\d{4}$/g;
    // regex for '()' or whitespace
    let findInvalidChars = /[()\s]+/g;

    let sorted = users
      // sort by age
      .sort((a, b) => {
        if(a.age < b.age) return -1;
        if(a.age > b.age) return 1;
        return 0;
      })
      // filter out invalid phone numbers
      .filter(user => user.number && validNumFormat.test(user.number))
      // reformats users phone number and name
      .map((user, index) => {
        // reformat phone number (555-555-5555)
        if(!user.number.match(stndrdNumFormat)) {
          let number = user.number.replace(findInvalidChars, '');
          number = number.slice(0, 3) + '-' + number.slice(3);
          user.number = number;
        }
        // reformat name (ex. bob -> Bob)
        user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
        // grabs first 5 youngest users
        return index < 5 ? user : false;
      })
      // filters out any invalid/falsey users
      .filter(user => user);

    this.setState({
      userList: this.filterUsersByName(sorted)
    });
  }

  filterUsersByAge(users) {
    return users
      .sort((a, b) => {
        if(a.age < b.age) return -1;
        if(a.age > b.age) return 1;
        return 0;
      });
  }

  filterUsersByName(users) {
    return users
      .sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
  }

  handleFilterChange(e) {
    let filter = e.target.value;
    let users = this.state.userList;
    this.setState({
      filter: filter,
      sorted: filter === 'Name' ? this.filterUsersByName(users) : this.filterUsersByAge(users)
    });
  }

  render() {
    let cards = this.state.userList &&
      this.state.userList
        .map(user => {
          return (
            <Card
              key={user.id}
              {...user}
            />
          );
        });

    if(this.state.userList) {
      return (
        <div className="main">
          <div className="main__filter">
            <label className="filter__label" htmlFor="filter">Filter by:</label>
            <div className="filter__cntrls">
              <input
                id="name"
                type="radio"
                value="Name"
                onChange={this.handleFilterChange}
                checked={this.state.filter === 'Name'}
              />
              <label htmlFor="name" id="name-label">Name</label>
              <input
                id="age"
                type="radio"
                value="Age"
                onChange={this.handleFilterChange}
                checked={this.state.filter === 'Age'}
              />
              <label htmlFor="age">Age</label>
            </div>
          </div>

          <div className="main__cards-container slide-in">
            {cards}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Main;