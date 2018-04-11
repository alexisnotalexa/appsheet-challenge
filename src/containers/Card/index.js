import React, { Component } from 'react';
import './styles.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: 'none',
      profile: 'block'
    };

    // function
    this.showUserBio = this.showUserBio.bind(this);
    this.showUserProfile = this.showUserProfile.bind(this);
  }

  showUserBio() {
    this.setState({
      bio: 'block',
      profile: 'none'
    });
  }

  showUserProfile() {
    this.setState({
      bio: 'none',
      profile: 'block'
    });
  }

  render() {
    return (
      <div className="card">
        <img className="card__image" src={this.props.photo} />
        <div className="card__container" style={{display: this.state.profile}}>
          <span className="card__title">{this.props.name}</span>
          <div className="card__content">
            <div className="card__content--section">
              <span className="card__content--label">Phone Number</span>
              <span>{this.props.number}</span>
            </div>
            <div className="card__content--section">
              <span className="card__content--label">Age</span>
              <span>{this.props.age}</span>
            </div>
          </div>
          <button className="card__btn" onClick={this.showUserBio}>Read Bio</button>
        </div>
        <div className="card__container" style={{display: this.state.bio}}>
          <button onClick={this.showUserProfile}><i class="fas fa-arrow-left"></i></button>
          <p>{this.props.bio}</p>
        </div>
      </div>
    );
  }
}

export default Card;