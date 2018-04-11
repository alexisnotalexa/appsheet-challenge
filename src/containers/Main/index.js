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

    this.state = {
      usersLoaded: false,
      filter: 'Age',
      sorted: ''
    };

    // functions
    this.getUserData = this.getUserData.bind(this);
    this.getYoungestUsers = this.getYoungestUsers.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.filterUsersByName = this.filterUsersByName.bind(this);
    this.filterUsersByAge = this.filterUsersByAge.bind(this);
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
        this.filterUsers(users);
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
      sorted: sorted
    });
  }

  filterUsers(users) {
    let regex = /^(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/g;
    let sorted = users
      .sort((a, b) => {
        if(a.age < b.age) return -1;
        if(a.age > b.age) return 1;
        return 0;
      })
      .filter(user => user.number && regex.test(user.number))
      .map((user, index) => {
        let regex1 = /^(\d{3})[\-]?\d{3}[\-]?\d{4}$/g; // 555-555-5555
        let regex2 = /[\(\)\s]+/g; // gets rid of () or whitespace
        if(!user.number.match(regex1)) {
          let number = user.number.replace(regex2, '');
          number = number.slice(0, 3) + '-' + number.slice(3);
          user.number = number;
        }
        user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1);
        // need to reformat phone
        return index < 5 ? user : false;
      })
      .filter(user => user)
      .sort((a, b) => {
        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;
      });
      console.log(sorted);
    this.setState({
      usersLoaded: sorted
    });
  }

  filterUsersByName(users) {
    let sorted = users.sort((a, b) => {
      if(a.name < b.name) return -1;
      if(a.name > b.name) return 1;
      return 0;
    });
    this.setState({
      sorted: sorted
    });
  }

  filterUsersByAge(users) {
    let sorted = users.sort((a, b) => {
      if(a.age < b.age) return -1;
      if(a.age > b.age) return 1;
      return 0;
    });
    this.setState({
      sorted: sorted
    });
  }

  handleFilterChange(e) {
    this.setState({
      filter: e.target.value
    });
    e.target.value === 'Name' ? this.filterUsersByName(this.state.sorted) : this.filterUsersByAge(this.state.sorted);
  }

  render() {
    let cards = this.state.sorted &&
      this.state.sorted.map(user => {
        return (
          <Card
            key={user.id}
            {...user}
          />
        );
      });
    if(this.state.sorted) {
      return (
        <div className="main">
          <div>
            <label htmlFor="filter">Filter by:</label>
            <div className="main__filter">
              <input
                id="name"
                type="radio"
                value="Name"
                onChange={this.handleFilterChange}
                checked={this.state.filter === 'Name'}
              />
              <label htmlFor="name">Name</label>
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
          {cards}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Main;