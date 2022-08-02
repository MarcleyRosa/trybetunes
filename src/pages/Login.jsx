import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import Search from './Search';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      nameChange: '',
      loading: false,
      redirect: false,
    };
  }

  handleSubmit = async () => {
    const { nameChange, redirect } = this.state;
    this.setState({ loading: true });
    await createUser({
      name: nameChange,
      redirect: true,
    });
    if (redirect) {
      return <Login to="/search" />;
    }
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
      <div data-testid="page-login">
        <form action="">
          {loading && <Loading />}
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
