import getMusics from '../../services/musicsAPI';

export const REQUEST_SONGS_START = 'REQUEST_SONGS_START';
export const RECEIVE_SONGS_SUCESS = 'RECEIVE_SONGS_SUCESS';
export const RECEIVE_SONGS_FAILURE = 'RECEIVE_SONGS_FAILURE';

export function requestSongsStart() {
  return {
    type: REQUEST_SONGS_START,
    isFetching: true,
  };
}

export function receiveSongsSucess(songs) {
  return {
    type: RECEIVE_SONGS_SUCESS,
    songs,
    isFetching: false,
    canRender: true,
  };
}

export function receiveSongsFailure(error) {
  return {
    type: REQUEST_SONGS_START,
    error,
    isFetching: false,
    canRender: true,
  };
}

export function fetchSongsThunk(id) {
  return async (dispatch) => {
    dispatch(requestSongsStart());
    const request = await getMusics(id);
    try {
      dispatch(receiveSongsSucess(request));
    } catch (error) {
      dispatch(receiveSongsFailure(error));
    }
  };
}
