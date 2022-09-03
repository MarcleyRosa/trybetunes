import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header className="header-component" data-testid="header-component">

        <Link
          className="links"
          to="/search"
          data-testid="link-to-search"
        >
          <h3>Voltar para aba de pesquisa</h3>

        </Link>

        <Link
          className="links"
          to="/favorites"
          data-testid="link-to-favorites"
        >
          <h3>Musicas favoritas</h3>

        </Link>
        <Link
          className="links"
          to="/profile"
          data-testid="link-to-profile"
        >
          <h3>Perfil</h3>

        </Link>
      </header>
    );
  }
}
