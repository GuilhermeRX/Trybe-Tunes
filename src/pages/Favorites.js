import PropTypes from 'prop-types';
import React from 'react';
import { MdFavorite } from 'react-icons/md';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import Player from '../Components/Player';
import { fetchFavoriteThunk } from '../Redux/actions/requestFavoriteSongs';
import { getUser } from '../services/userAPI';
import './Favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUsuario();
    this.getSongs();
  }

  getSongs = async () => {
    const { action } = this.props;
    action();
  }

  getUsuario = async () => {
    const response = await getUser();
    const responseName = response.name;
    this.setState({
      username: responseName,
      loading: false,
    });
  }

  render() {
    const { username, loading } = this.state;
    const { favoriteSongs, userName, isFetching } = this.props;

    const renderMusic = (
      favoriteSongs.map(({ previewUrl, trackId, trackName, artistName }, index) => (
        <div key={ ` ${index} 1 ${trackId}` } className="cardContainer">
          <MusicCard
            url={ previewUrl }
            name={ trackName }
            id={ trackId }
            number={ index }
            artist={ artistName }
            getSong={ this.getSongs }
          />
        </div>
      ))
    );

    const divLoad = (
      <div className="favorite-div-load">
        <Loading />
      </div>
    );
    const music = (favoriteSongs.length > 1 ? 'músicas' : 'música');

    return (
      <div data-testid="page-favorites" className="page-favorites">
        <Header user={ username } load={ loading } />
        <div className="page-favorite-container">
          <div className="card-favorite-div">

            <div className="div-favorite-img">
              <MdFavorite className="icon-favorite-card" />
            </div>

            <div className="div-info-favorite">
              <h2 className="title-favorite-h2">
                Músicas Favoritas
              </h2>
              <p className="info-name-favorite">
                {userName}
                {' '}
                ·
                {' '}
                {`${favoriteSongs.length} ${music}`}
              </p>
            </div>
          </div>

          <div className="containerFavorites">
            {isFetching ? divLoad : renderMusic}
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  favoriteSongs: store.favoriteReducer.songs,
  userName: store.userReduce.userName,
  isFetching: store.favoriteReducer.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(fetchFavoriteThunk()),
});

Favorites.propTypes = {
  favoriteSongs: PropTypes.object,
  action: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
