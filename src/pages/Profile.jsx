import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: true,
    user: '',
  }

  componentDidMount() {
    this.profileUser();
  }

  profileUser = async () => {
    this.setState({ loading: true });
    const resquestUser = await getUser();
    this.setState({ loading: false, user: resquestUser });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : (
          <section>
            <img data-testid="profile-image" src={ user.image } alt="Foto do Perfil" />
            <h1>{ user.name }</h1>
            <h2>{ user.email }</h2>
            <h3>{ user.description }</h3>
            <Link to="/profile/edit">Editar perfil</Link>
          </section>)}
      </div>
    );
  }
}

export default Profile;
