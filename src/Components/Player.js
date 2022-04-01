import PropTypes from 'prop-types';
import React from 'react';
import { BsFillPlayFill, BsPauseFill, BsVolumeMuteFill } from 'react-icons/bs';
import { IoMdSkipBackward, IoMdSkipForward } from 'react-icons/io';
import { IoVolumeMedium } from 'react-icons/io5';
import { connect } from 'react-redux';
import { service } from '../Redux/actions/serviceAction';
import './Player.css';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
    };
  }

  setCurrentTime = ({ target }) => { // Função para tornar a barra de progresso dinâmica.
    const audio = document.querySelector('.tagAudio');
    target.max = audio.duration;
    audio.currentTime = target.value;
    console.log('CURRENT', target.max);
  }

  tooglePlayPause = () => { // Lógica de Play e Pause do button
    const audio = document.querySelector('.tagAudio');
    const { artist, isplay: play, actionService, indexMusic } = this.props;
    actionService(artist, !play, indexMusic);
    if (!play) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  // Lógica de transformar o currentTime e o duration da track em minutos
  transformTime = (time) => {
    const mg60 = 60;
    const mg2 = 2;
    const minutes = Math.floor(time / mg60);
    const seconds = Math.floor(time % mg60);
    return `${(`0${minutes}`).slice(-mg2)}:${(`0${seconds}`).slice(-mg2)}`;
  }

  // Lógica da barra de progresso da musica
  updateProgress = () => {
    const audio = document.querySelector('.tagAudio');
    const currentText = document.querySelector('.current');
    const durationText = document.querySelector('.duration');
    const barraProgress = document.querySelector('.input-range-duration');
    barraProgress.value = audio.currentTime;
    currentText.innerText = this.transformTime(audio.currentTime);
    durationText.innerText = (audio.duration
      ? this.transformTime(audio.duration)
      : '00:00'
    );
  }

  renderMusic = (position) => { // Toda vez que clico em avançar ou voltar eu renderizo a nova música.
    const audio = document.querySelector('.tagAudio');
    const { songs, isplay, favoriteSongs } = this.props;
    let musics;
    if (songs.length === 0) {
      musics = favoriteSongs;
    } else {
      musics = songs.filter((item, index) => index !== 0);
    }
    audio.setAttribute('src', musics[position].previewUrl);
    audio.autoplay = isplay;
  }

  backMusic = () => { // Voltar música
    const { indexMusic, actionService, artist, isplay } = this.props;
    if (indexMusic === 0) {
      actionService(artist, isplay, indexMusic);
    } else {
      actionService(artist, isplay, indexMusic - 1);
    }
    this.renderMusic(indexMusic);
  }

  nextMusic = () => { // Avançar música.
    const { songs, favoriteSongs } = this.props;
    let musics;
    if (songs.length === 0) {
      musics = favoriteSongs;
    } else {
      musics = songs.filter((item, index) => index !== 0);
    }
    const { indexMusic, actionService, artist, isplay } = this.props;
    if (indexMusic === musics.length - 1) {
      actionService(artist, isplay, indexMusic);
    } else {
      actionService(artist, isplay, indexMusic + 1);
    }
    this.renderMusic(indexMusic);
  }

  audioMute = () => { // Mutar o audio;
    const { muted } = this.state;
    const audio = document.querySelector('.tagAudio');
    audio.muted = !muted;
    this.setState({ muted: !muted });
  }

  setVolume = (value) => { // Lógica de volume do audio;
    const audio = document.querySelector('.tagAudio');
    audio.volume = value / 100;
  }

  render() {
    const { muted } = this.state;
    const { songs,
      isplay: play,
      indexMusic,
      favoriteSongs } = this.props;
    let musics;
    if (songs.length === 0) {
      musics = favoriteSongs;
    } else {
      musics = songs.filter((item, index) => index !== 0);
    }

    const divInfoMusic = (
      <div className="divInfoMusic-player">
        <img
          src={ (musics.length > 0 ? musics[indexMusic].artworkUrl60 : '') }
          alt="imgAlbum"
        />
        <div className="container-info-player">
          <p
            className="info-player"
          >
            { (musics.length > 0 ? musics[indexMusic].trackName : '')}

          </p>

          <p
            className="info-artistName-player"
          >
            { (musics.length > 0 ? musics[indexMusic].artistName : '')}

          </p>
        </div>

      </div>
    );

    return (
      <div className="Player-Container">
        {(musics.length > 0 && divInfoMusic)}

        <div className="controls-player">

          <IoMdSkipBackward
            className="player-next-back back"
            onClick={ this.backMusic }
          />

          <button
            className="btn-play"
            type="button"
            onClick={ () => this.tooglePlayPause() }
          >
            {(play
              ? <BsPauseFill className="player-icon-play" />
              : <BsFillPlayFill className="player-icon-play" />
            )}
          </button>

          <IoMdSkipForward
            className="player-next-back next"
            onClick={ this.nextMusic }
          />
        </div>

        <div className="container-inputs-player">

          <audio
            src={ (musics.length > 0 ? musics[indexMusic].previewUrl : undefined) }
            className="tagAudio"
            onTimeUpdate={ this.updateProgress }
            onEnded={ this.nextMusic }
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .

          </audio>

          <div className="div-duration">
            <p className="current">00:00</p>
            <input
              min="0"
              max="100"
              type="range"
              value="0"
              className="input-range-duration"
              onChange={ (event) => this.setCurrentTime(event) }
            />
            <p className="duration">00:00</p>
          </div>

          <div className="container-vol">
            {(muted
              ? <BsVolumeMuteFill className="icon-vol-hight" onClick={ this.audioMute } />
              : <IoVolumeMedium className="icon-vol-hight" onClick={ this.audioMute } />
            )}
            <input
              type="range"
              min="0"
              max="100"
              className="input-range-vol"
              onChange={ (event) => this.setVolume(event.target.value) }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  songs: state.songsReducer.songs,
  artist: state.serviceReduce.artist,
  isplay: state.serviceReduce.isplay,
  indexMusic: state.serviceReduce.indexMusic,
  canRender: state.songsReducer.canRender,
  favoriteSongs: state.favoriteReducer.songs,
  canRenderFav: state.favoriteReducer.canRenderFav,
});
const mapDispatchToProps = (dispatch) => ({
  actionService: (artist, isplay, indexMusic) => dispatch(
    service(artist, isplay, indexMusic),
  ),
});
Player.propTypes = {
  songs: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Player);
