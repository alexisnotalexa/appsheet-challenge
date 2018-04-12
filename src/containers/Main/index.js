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
        }).filter(user => user);
      }).then(users => {
        this.getYoungestUsers(users);
      });
  }

  getYoungestUsers(users) {
    let validNumber = /^(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/g; // (555)555-555, 555-555-555 555 555 555
    let validNumberFormat = /^(\d{3})[\-]?\d{3}[\-]?\d{4}$/g; // 555-555-555
    let findInvalidChar = /[\(\)\s]+/g; // finds () or whitespace

    let sorted = users.sort((a, b) => {
        if(a.age < b.age) return -1;
        if(a.age > b.age) return 1;
        return 0;
      })
      .filter(user => user.number && validNumber.test(user.number))
      .map((user, index) => {
        if(!user.number.match(validNumberFormat)) {
          let number = user.number.replace(findInvalidChar, '');
          number = number.slice(0, 3) + '-' + number.slice(3);
          user.number = number;
        }
        user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
        return index < 5 ? user : false;
      })
      .filter(user => user);

    this.setState({
      userList: this.filterUsersByName(sorted)
    });
  }

  filterUsersByAge(users) {
    return users.sort((a, b) => {
      if(a.age < b.age) return -1;
      if(a.age > b.age) return 1;
      return 0;
    });
  }

  filterUsersByName(users) {
    return users.sort((a, b) => {
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
      this.state.userList.map(user => {
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
              <label htmlFor="name" id="test">Name</label>
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
          <div className="main__cards-container">
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