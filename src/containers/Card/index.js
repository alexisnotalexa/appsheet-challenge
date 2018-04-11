import React, { Component } from 'react';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: 'none',
      profile: 'flex'
    };

    // function
    this.showUserBio = this.showUserBio.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  showUserBio() {
    this.setState({
      bio: 'flex',
      profile: 'none'
    });
  }

  showUserProfile() {
    this.setState({
      bio: 'none',
      profile: 'flex'
    });
  }

  render() {
    return (
      <div className="card">
        <img className="card__img" src={this.props.photo} />

        <div className="card__container" style={{display: this.state.profile}}>
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

        <div className="card__container" style={{display: this.state.bio}}>
          <div className="container__margin container__margin--top">
            <button className="container__btn container__btn--back-btn" onClick={this.showUserProfile}><i class="fas fa-arrow-left"></i></button>
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