import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favoritMus: [],
    trueFalse: true,
    favoriteSong: [],
  }

  async componentDidMount() {
    await this.getHandleMusic();
    const { objMusic } = this.props;
    await addSong(objMusic);
    this.setState(() => ({ favoritMus: objMusic,
      loading: false }));
    const { favoritMus, favoriteSong } = this.state;
    console.log('favrot', favoritMus, 'seg fav', favoriteSong);
    const checkedTrueOrFalse = favoriteSong
      .some((song) => song.trackId === favoritMus.trackId);
    console.log('checked true', checkedTrueOrFalse);
    this.setState(() => ({ trueFalse: checkedTrueOrFalse }));
  }

  handleChange = async () => {
    this.setState({ loading: true });
    const { objMusic } = this.props;
    await removeSong(objMusic);
    this.setState(() => ({ loading: false }));
    this.setState((prevState) => ({ trueFalse: !prevState.trueFalse }));
  }

  getHandleMusic = async () => {
    this.setState({ favoriteSong: await getFavoriteSongs() });
  }

  render() {
    const { loading, trueFalse } = this.state;
    const { previewUrl, trackName, trackId } = this.props;

    return (
      <div>

        {loading && <Loading />}
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor={ trackId }>
            <input
              onChange={ this.handleChange }
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={ trueFalse }
            />
            Favorita
          </label>
        </div>

      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  objMusic: PropTypes.objectOf.isRequired,
};
