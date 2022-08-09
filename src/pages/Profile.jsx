import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: '',
  }

  componentDidMount() {
    this.profileUser();
  }

  profileUser = async () => {
    const resquestUser = await getUser();
    this.setState({ user: resquestUser });
  }

  render() {
    const { user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <img data-testid="profile-image" src={ user.image } alt="Foto do Perfil" />
        <p>{ user.name }</p>
        <p>{ user.email }</p>
        <p>{ user.description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
