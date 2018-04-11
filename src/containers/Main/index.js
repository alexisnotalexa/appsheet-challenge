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
      usersLoaded: false
    };

    // functions
    this.getUserData = this.getUserData.bind(this);
    this.filterUsers = this.filterUsers.bind(this);
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
          console.log(number);
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

  render() {
    let cards = this.state.usersLoaded &&
      this.state.usersLoaded.map(user => {
        return (
          <Card
            key={user.id}
            {...user}
          />
        );
      });
    if(this.state.usersLoaded) {
      return (
        <div className="main">
          {cards}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Main;