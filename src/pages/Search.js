import PropTypes from 'prop-types';
import React from 'react';
import { ImPlay3 } from 'react-icons/im';
import { MdClear } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import Player from '../Components/Player';
import { fetchThunk } from '../Redux/actions/requestAlbuns';
import { service } from '../Redux/actions/serviceAction';
import { getUser } from '../services/userAPI';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      loading: true,
      search: '',
    };
  }

  componentDidMount() {
    this.getUsuario();
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }

  handleClick = () => {
    const { search } = this.state;
    const { actionSearch, actionService, isplay } = this.props;
    actionService(search, isplay, 0);
    actionSearch();
  }

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleClick();
    }
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
    const {
      username,
      loading,
      search,
    } = this.state;

    const { albuns, artist, action, isLoad, empty } = this.props;

    const length = 2;
    const inputAndBtn = (
      <div className="search-container-input">
        <input
          type="text"
          data-testid="search-artist-input"
          value={ search }
          onChange={ this.handleChange }
          className="input-search"
          placeholder="Nome do Artista"
          onKeyUp={ this.handleKeyPress }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ search.length < length }
          onClick={ this.handleClick }
          className="btn-search"
        >
          Procurar
        </button>

      </div>);

    const renderAlbuns = (
      <div className="search-container">

        <h3 className="resultText">
          Resultado de álbuns de:
          {' '}
          {artist}
        </h3>
        <button
          className="clearSearch"
          onClick={ () => action('clear') }
          type="button"
        >
          Limpar
          {' '}
          <MdClear className="icon-clear" />
        </button>
        <div className="card-container">
          {albuns.map((obj) => (
            <Link
              data-testid={ `link-to-album-${obj.collectionId}` }
              to={ `/album/${obj.collectionId}` }
              className="card-link"
              key={ `${obj.collectionId} 123` }

            >
              <div className="div-icon-play">
                <ImPlay3
                  className="icon-play"
                />
              </div>
              <div className="cardMusic">

                <img
                  src={ obj.artworkUrl100.replace('100x100', '190x190') }
                  alt="Albuns"
                  className="card-img"
                />

                <h4 className="card-album-search">{obj.collectionName}</h4>
                <p className="artistName">{obj.artistName}</p>
              </div>
            </Link>

          ))}
        </div>

      </div>
    );

    const divLoad = (
      <div className="divLoadSearch">
        <Loading />
      </div>
    );
    return (
      <div data-testid="page-search" className="pageSearch">

        <div className="allItemsSearch-Container">
          <Header user={ username } load={ loading } />
          <div className="container-search">
            {(isLoad ? divLoad : inputAndBtn)}
            {empty && <p className="notAlbum">Nenhum álbum foi encontrado</p>}
            {albuns.length > 0 && renderAlbuns }
          </div>
        </div>

        <Player />

      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  albuns: store.responseReducer.albuns,
  favoriteSongs: store.responseReducer.favoriteSongs,
  artist: store.serviceReduce.artist,
  isLoad: store.responseReducer.isFetching,
  isplay: store.serviceReduce.isplay,
  empty: store.responseReducer.empty,
});

const mapDispatchToProps = (dispatch) => ({
  actionSearch: () => dispatch(fetchThunk()),
  actionService: (artist, isplay, index) => dispatch(service(artist, isplay, index)),
  action: () => dispatch(fetchThunk('clear')),
});

Search.propTypes = {
  stateGlobal: PropTypes.object,
  actionSearch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Search);
