import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

export default class MusicCard extends Component {
  state = {
    loading: false,
  }

  handleChange = async () => {
    this.setState({ loading: true });
    const { objMusic } = this.props;
    console.log('entrei', objMusic);
    const favorit = await addSong(objMusic);
    this.setState({ loading: false });
    return favorit;
  }

  render() {
    const { loading } = this.state;
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
              // checked={}
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
  trackId: PropTypes.string.isRequired,
  objMusic: PropTypes.shape.isRequired,
};
