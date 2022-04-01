import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import Player from '../Components/Player';
import { fetchSongsThunk } from '../Redux/actions/requestSongs';
import { service } from '../Redux/actions/serviceAction';
import { getUser } from '../services/userAPI';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUsuario();
    this.requestMusic();
  }

  getUsuario = async () => {
    const response = await getUser();
    const responseName = response.name;
    this.setState({
      username: responseName,
      loading: false,
    });
  }

  requestMusic = () => {
    const { match, actionSongs, actionService, artist } = this.props;
    const { id } = match.params;
    actionSongs(id);
    actionService(artist, false, 0);
  }

  render() {
    const { username, loading } = this.state;
    const { songs } = this.props;
    const renderSongs = songs.filter((song, index) => index !== 0);
    let info = '';
    if (songs.length > 0) {
      info = (
        <p className="p3">
          {songs[0].releaseDate.split('-')[0]}
          {' '}
          ·
          {' '}
          {songs[0].trackCount}
          {' '}
          {(songs[0].trackCount === 1 ? 'música' : 'músicas')}
          {' '}
          ·
          {' '}
          {songs[0].primaryGenreName}
        </p>
      );
    }

    return (
      <div data-testid="page-album" className="page-album">
        <Header user={ username } load={ loading } />
        <br />
        <div className="album-container">
          <div className="card-album">
            {songs.length > 0
          && <img
            src={ songs[0].artworkUrl100.replace('100x100', '190x190') }
            alt="album"
          />}
            <div className="card-info-div">
              {songs.length > 0
          && <p data-testid="album-name" className="p1">{songs[0].collectionName}</p>}

              {songs.length > 0
          && <p data-testid="artist-name" className="p2">{songs[0].artistName}</p>}

              {info}

              {songs.length > 0
          && <p className="p4">{songs[0].copyright}</p>}

            </div>

          </div>

          <div className="music">
            {renderSongs.map((song, index) => (
              <div key={ index } className="album-card-music">
                <MusicCard
                  name={ song.trackName }
                  url={ song.previewUrl }
                  id={ song.trackId }
                  artist={ song.artistName }
                  number={ index }
                  img={ song.artworkUrl60 }
                />
              </div>

            ))}
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  songs: store.songsReducer.songs,
  artist: store.serviceReduce.artist,
});

const mapDispatchToProps = (dispatch) => ({
  actionSongs: (idAlbum) => dispatch(fetchSongsThunk(idAlbum)),
  actionService: (artist, isplay, index) => dispatch(service(artist, isplay, index)),
});

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Album);
