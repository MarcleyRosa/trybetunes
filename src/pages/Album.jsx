import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import trybetunes from '../imgs/imageTrybeTunes.png';

class Album extends Component {
  state = {
    musicas: [],
    artist: '',
    loading: false,
  }

  async componentDidMount() {
    await this.handleMusicas();
    this.setState({ loading: false });
  }

  handleMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const musi = await getMusics(id);
    this.setState({ artist: musi[0], musicas: musi, loading: true });
  }

  render() {
    const { musicas, loading, artist } = this.state;
    return (
      <div data-testid="page-album">
        <header className="header-login">
          <img src={ trybetunes } alt="" />
          <h1 title-header>Album</h1>
          <div className="user">Usuário</div>
        </header>
        <Header />
        { loading ? <Loading /> : (
          <div>
            <div className="artist-album">
              <h3 data-testid="album-name">{ `Album: ${artist.collectionName}` }</h3>
              <img src={ artist.artworkUrl100 } alt="Artist" />
              <h3 data-testid="artist-name">{ `Artista: ${artist.artistName}` }</h3>
            </div>
            <div className="card-alguns">
              { musicas.map((music, index) => (
                index >= 1 && <MusicCard
                  key={ index }
                  { ...music }
                  allMusics={ musicas }
                  objMusic={ musicas[index] }
                />))}
            </div>
          </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
