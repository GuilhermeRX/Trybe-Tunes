import PropTypes from 'prop-types';
import React from 'react';
import { ImPlay3 } from 'react-icons/im';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { connect } from 'react-redux';
import { service } from '../Redux/actions/serviceAction';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadingHeader from './LoadingHeader';
import LoadingMusic from './LoadingMusic';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      favoriteList: [],
      favorite: false,
      favoriteLoad: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const { id } = this.props;
    this.setState({ favoriteLoad: true });
    const favorites = await getFavoriteSongs();
    this.setState({ favoriteList: favorites, favoriteLoad: false });

    const { favoriteList } = this.state;
    favoriteList.map((obj) => (obj.trackId === id
      ? this.setState({ favorite: true })
      : false
    ));
  }

  handleChange = async () => {
    const { favorite } = this.state;
    const { name, url, id, getSong, artist, img } = this.props;
    this.setState({ loading: true });

    if (favorite === true) {
      await removeSong({
        trackName: name,
        previewUrl: url,
        trackId: id,
        artistName: artist,
        artworkUrl60: img });
      this.setState({ favorite: false });
    } else {
      await addSong({
        trackName: name,
        previewUrl: url,
        trackId: id,
        artistName: artist,
        artworkUrl60: img });
    }

    this.setState({ loading: false });
    this.getFavorites();
    if (getSong) return getSong();
  }

  render() {
    const loadHiden = (
      <div>
        <div className="loadHidden">
          <LoadingHeader />
        </div>
        <LoadingMusic />
      </div>
    );
    const { name, id, artist, number, actionService } = this.props;
    const { loading, favorite, favoriteLoad } = this.state;
    return (
      <div className="musicCard">
        <div className="musicCard-info">
          <p className="index">{number + 1}</p>
          <div className="div-artistAndName">
            <p className="nameFav">{name}</p>
            <p className="artist-name">{artist}</p>
          </div>
        </div>

        <div className="div-icon-play-album">
          <ImPlay3
            className="icon-play"
            onClick={ () => actionService(artist, false, number) }
          />
        </div>

        <label htmlFor={ `check-${id}` } className="labelFavorite">
          <input
            type="checkbox"
            id={ `check-${id}` }
            data-testid={ `checkbox-music-${id}` }
            onChange={ this.handleChange }
            checked={ !!favorite }
            className="inputFavorite"
          />
          {(favorite
            ? <MdFavorite className="favorite-yes" />
            : <MdFavoriteBorder className="favorite-no" />
          )}
          <p className="text-favorita">Favorita</p>
        </label>
        {loading && loadHiden}
        {favoriteLoad && loadHiden}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.songsReducer.songs,
  isplay: state.serviceReduce.isplay,
});

const mapDispatchToProps = (dispatch) => ({
  actionService: (artist, isplay, indexMusic) => dispatch(
    service(artist, isplay, indexMusic),
  ),
});

MusicCard.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(MusicCard);
