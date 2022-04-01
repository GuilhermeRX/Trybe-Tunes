import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { receiveSongsSucess } from './requestSongs';

export const REQUEST_FAVORITE_START = 'REQUEST_FAVORITE_START';
export const RECEIVE_FAVORITE_SUCESS = 'RECEIVE_FAVORITE_SUCESS';
export const RECEIVE_FAVORITE_FAILURE = 'RECEIVE_FAVORITE_FAILURE';

export function requestFavoriteStart() {
  return {
    type: REQUEST_FAVORITE_START,
    isFetching: true,
  };
}

export function receiveFavoriteSucess(songs) {
  return {
    type: RECEIVE_FAVORITE_SUCESS,
    songs,
    isFetching: false,
    canRenderFav: true,
  };
}

export function receiveFavoriteFailure(error) {
  return {
    type: RECEIVE_FAVORITE_FAILURE,
    error,
    isFetching: false,
  };
}

export function fetchFavoriteThunk() {
  return async (dispatch) => {
    dispatch(requestFavoriteStart());
    const request = await getFavoriteSongs();
    try {
      dispatch(receiveSongsSucess([]));
      dispatch(receiveFavoriteSucess(request));
    } catch (error) {
      dispatch(receiveFavoriteFailure(error));
    }
  };
}
