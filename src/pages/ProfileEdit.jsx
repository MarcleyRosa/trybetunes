import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    user: '',
    userEmail: '',
    userDescription: '',
    imgProfile: '',
    disabled: true,
  }

  componentDidMount() {
    this.requestUser();
  }

  requestUser = async () => {
    const data = await getUser();
    this.setState({
      user: data.name,
      userEmail: data.email,
      userDescription: data.description,
      imgProfile: data.image });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { userEmail, user, userDescription, imgProfile } = this.state;
      if (userEmail.length > 0
        && user.length > 0
        && userDescription.length > 0
        && imgProfile.length > 0) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  saveProfile = async () => {
    const { user, userEmail, userDescription, imgProfile } = this.state;
    const { history } = this.props;
    const objUser = {
      name: user,
      email: userEmail,
      image: imgProfile,
      description: userDescription,
    };
    await updateUser(objUser);
    history.push('/profile');
  }

  render() {
    const { user, userEmail, userDescription, imgProfile, disabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <input
            onChange={ this.handleChange }
            type="text"
            name="imgProfile"
            value={ imgProfile }
            data-testid="edit-input-image"
          />
          <img
            onChange={ this.handleChange }
            src={ imgProfile }
            alt="Foto do Perfil"
          />
          <br />
          <label
            htmlFor="edit-input-name"
          >
            Name:
            <input
              onChange={ this.handleChange }
              name="user"
              value={ user }
              data-testid="edit-input-name"
              type="text"
            />
          </label>
          <label htmlFor="edit-input-email">
            Email:
            <input
              onChange={ this.handleChange }
              name="userEmail"
              value={ userEmail }
              type="text"
              data-testid="edit-input-email"
            />
            <br />
          </label>
          <label htmlFor="edit-input-description">
            Descição:
            <textarea
              onChange={ this.handleChange }
              name="userDescription"
              value={ userDescription }
              data-testid="edit-input-description"
              cols="30"
              rows="10"
            />
            <br />
          </label>
          <Link to="/profile">
            <button
              onClick={ this.saveProfile }
              disabled={ disabled }
              data-testid="edit-button-save"
              type="button"
            >
              Salvar Alterações
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    push: PropTypes.func,
  })).isRequired,
};

export default ProfileEdit;
