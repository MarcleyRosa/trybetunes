import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      nameChange: '',
    };
  }

  handleSubmit = async () => {
    const { nameChange } = this.state;
    await createUser({ name: nameChange });
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
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <input
            name="nameChange"
            onChange={ this.handleChange }
            data-testid="login-name-input"
            type="text"
          />
          <button
            disabled={ buttonDisabled }
            onClick={ this.handleSubmit }
            data-testid="login-submit-button"
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
