import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

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
    console.log('todas mus', musicas);
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <p data-testid="album-name">{ artist.collectionName }</p>
            <p data-testid="artist-name">{ artist.artistName }</p>
            <img src={ artist.artworkUrl100 } alt="Artist" />
            { musicas.map((musica, index) => (
              index >= 1 && <MusicCard
                key={ index }
                { ...musica }
                allMusics={ musicas }
                objMusic={ musicas[index] }
              />))}
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
