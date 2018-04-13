import React, { Component } from 'react';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      bio: 'hidden',
      profile: 'card__container visible'
    };

    // functions
    this.showUserBio = this.showUserBio.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  showUserBio() {
    this.setState({
      bio: 'card__container visible',
      profile: 'hidden'
    });
  }

  showUserProfile() {
    this.setState({
      bio: 'hidden',
      profile: 'card__container visible'
    });
  }

  render() {
    return (
      <div className="card">
        <img className="card__img" src={this.props.photo} alt={this.props.name} />

        <div className={this.state.profile}>
          <span className="container__span--title">{this.props.name}</span>
          <div className="container__row">
            <div className="container__row__section">
              <span className="container__span--label">Phone Number</span>
              <span>{this.props.number}</span>
            </div>
            <div className="container__row__section">
              <span className="container__span--label">Age</span>
              <span>{this.props.age}</span>
            </div>
          </div>
          <button className="container__btn container__btn--bio" onClick={this.showUserBio}>Read Bio</button>
        </div>

        <div className={this.state.bio}>
          <div className="container__margin container__margin--top">
            <button className="container__btn container__btn--back-btn" onClick={this.showUserProfile}><i className="fas fa-arrow-left"></i></button>
          </div>
          <div className="container__bio">
            {this.props.bio}
          </div>
          <div className="container__margin" />
        </div>
      </div>
    );
  }
}

export default Card;