import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      nameChange: '',
      loading: false,
    };
  }

  handleSubmit = async () => {
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
Login.defaultProps = {
  history: 'history',
};

export default Login;
