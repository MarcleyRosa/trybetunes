import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import trybetunes from '../imgs/imageTrybeTunes.png';
import { getUser } from '../services/userAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameChange: '',
      buttonDisabled: true,
      musicList: [],
      pesquisa: false,
      nameImput: '',
    };
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    const nameChanges = await getUser();
    this.setState({ nameImput: nameChanges.name });
  };

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
    const albuns = await searchAlbumsAPI(idValue[0].value);
    idValue[0].value = '';
    this.setState({ musicList: albuns, pesquisa: true });
  }

  render() {
    const { buttonDisabled, musicList, pesquisa, nameChange, nameImput } = this.state;
    return (
      <div data-testid="page-search">
        <header className="header-login">
          <img src={ trybetunes } alt="" />
          <h1 className="title-header">Musicas</h1>
          <div className="user">{`Usuário ${nameImput}`}</div>
        </header>
        <Header />
        <form action="">
          <div className="search-button">
            <input
              className="nameValue"
              onChange={ this.handleChange }
              name="nameChange"
              type="text"
              data-testid="search-artist-input"
              placeholder="Search.."
            />
            <button
              name="nameValue"
              onClick={ this.handleClear }
              disabled={ buttonDisabled }
              type="button"
              data-testid="search-artist-button"
              className={ buttonDisabled ? 'search-disabled' : 'search' }
            >
              Pesquisar
            </button>
            <div>
              { pesquisa && (
                <h3>
                  {`Resultado de álbuns de: ${nameChange}`}
                </h3>)}
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
