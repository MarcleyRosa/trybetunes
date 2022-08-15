import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    user: '',
    email: '',
    description: '',
    image: '',
    disabled: true,
    loading: true,
  }

  componentDidMount() {
    this.requestUser();
  }

  validateForm = () => {
    const { email, user, description, image } = this.state;
    if (email.length > 0
      && user.length > 0
      && description.length > 0
      && image.length > 0) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  requestUser = async () => {
    const data = await getUser();
    this.setState({
      loading: false,
      user: data.name,
      email: data.email,
      description: data.description,
      image: data.image }, () => {
      this.validateForm();
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  }

  saveProfile = async () => {
    const { user, email, description, image } = this.state;
    const { history } = this.props;
    const objUser = {
      name: user,
      email,
      image,
      description,
    };
    console.log('test');
    this.setState({ loading: true });
    await updateUser(objUser);
    history.push('/profile');
    console.log('cheguei');
  }

  render() {
    const { user, email, description, image, disabled, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading && <Loading /> }
        <form>
          <input
            onChange={ this.handleChange }
            type="text"
            name="image"
            value={ image }
            data-testid="edit-input-image"
          />
          <img
            onChange={ this.handleChange }
            src={ image }
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
              name="email"
              value={ email }
              type="text"
              data-testid="edit-input-email"
            />
            <br />
          </label>
          <label htmlFor="edit-input-description">
            Descição:
            <textarea
              onChange={ this.handleChange }
              name="description"
              value={ description }
              data-testid="edit-input-description"
              cols="30"
              rows="10"
            />
            <br />
          </label>

          <button
            onClick={ this.saveProfile }
            disabled={ disabled }
            data-testid="edit-button-save"
            type="button"
          >
            Salvar Alterações
          </button>

        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ProfileEdit;
