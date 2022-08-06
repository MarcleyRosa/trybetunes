import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameChange: '',
      buttonDisabled: true,
      musicList: [],
      pesquisa: false,
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

  handleClear = async ({ target }) => {
    const idValue = document.getElementsByClassName(target.name);
    console.log(idValue[0].value);
    const albuns = await searchAlbumsAPI(idValue[0].value);
    idValue[0].value = '';
    const musicMap = albuns.map((e) => e.artistName);
    console.log(musicMap);
    console.log(albuns);
    this.setState({ musicList: albuns, pesquisa: true });
  }

  render() {
    const { buttonDisabled, musicList, pesquisa, nameChange } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <div>
            <input
              className="nameValue"
              onChange={ this.handleChange }
              name="nameChange"
              type="text"
              data-testid="search-artist-input"
            />
            <button
              name="nameValue"
              onClick={ this.handleClear }
              disabled={ buttonDisabled }
              type="button"
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
            <div>
              { pesquisa && (
                <p>
                  {`Resultado de álbuns de: ${nameChange}`}
                </p>)}
              { musicList.length === 0 && <p>Nenhum álbum foi encontrado</p> }
              { musicList.map((music, index) => (
                <div
                  key={ index }
                >
                  <Link
                    data-testid={ `link-to-album-${music.collectionId}` }
                    to={ `/album/${music.collectionId}` }
                  >
                    Album:
                  </Link>
                  { `Artist: ${music.artistName} - Album: ${music.collectionName}` }
                </div>))}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
