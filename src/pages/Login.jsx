import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../index.css';
import trybetunes from '../imgs/imageTrybeTunes.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      nameChange: '',
      loading: false,
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { nameChange } = this.state;
    this.setState({ loading: true });
    await createUser({
      name: nameChange,
    });
    history.push('/search');
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      let trueOrFalse = true;
      const numberMinLenght = 3;
      const { nameChange } = this.state;
      if (nameChange.length >= numberMinLenght) trueOrFalse = false;
      this.setState({ buttonDisabled: trueOrFalse });
    });
  }

  render() {
    const { buttonDisabled, loading } = this.state;
    return (
      <main data-testid="page-login">
        <header className="header-login">
          <img src={ trybetunes } alt="" />
          <h1 className="title-header">Login</h1>
          <div className="user">Usuário</div>
        </header>
        {loading ? <Loading /> : (
          <form action="">
            <div className="login-form">
              <input
                name="nameChange"
                onChange={ this.handleChange }
                data-testid="login-name-input"
                type="text"
                className="input-login"
              />
              <button
                disabled={ buttonDisabled }
                onClick={ this.handleSubmit }
                data-testid="login-submit-button"
                type="submit"
                className={ buttonDisabled ? 'disabled' : 'button' }
              >
                Entrar
              </button>
            </div>
          </form>
        )}
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
Login.defaultProps = {
  history: 'history',
};

export default Login;
