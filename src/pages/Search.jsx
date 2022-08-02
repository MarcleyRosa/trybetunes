import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameChange: '',
      buttonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      let trueOrFalse = true;
      const numberMinLenght = 2;
      const { nameChange } = this.state;
      if (nameChange.length >= numberMinLenght) trueOrFalse = false;
      this.setState({ buttonDisabled: trueOrFalse });
    });
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            onChange={ this.handleChange }
            name="nameChange"
            type="text"
            data-testid="search-artist-input"
          />
          <button
            disabled={ buttonDisabled }
            type="button"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
