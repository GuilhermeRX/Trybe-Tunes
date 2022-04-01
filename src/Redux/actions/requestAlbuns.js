import searchAlbumsAPI from '../../services/searchAlbumsAPI';

export const REQUEST_SONGS = 'REQUEST_SONGS';
export const REQUEST_FAVORITE_SONGS = 'REQUEST_FAVORITE_SONGS';

export const REQUEST_ALBUNS_START = 'REQUEST_ALBUNS_START';
export const RECEIVE_ALBUNS_SUCESS = 'RECEIVE_ALBUNS_SUCESS';
export const RECEIVE_ALBUNS_FAILURE = 'RECEIVE_ALBUNS_FAILURE';
export const RECEIVE_ALBUNS_EMPTY = 'RECEIVE_ALBUNS_EMPTY';

export function requestAlbumStart() {
  return {
    type: REQUEST_ALBUNS_START,
    isFetching: true,
    empty: false,
    albuns: [],
  };
}

export function requestAlbunsSucess(albuns) {
  return {
    type: RECEIVE_ALBUNS_SUCESS,
    albuns,
    isFetching: false,
  };
}

export function requestAlbunsFailure(error) {
  return {
    type: RECEIVE_ALBUNS_FAILURE,
    isFetching: false,
    error,
  };
}

export function requestAlbunsEmpty(alb) {
  return {
    type: RECEIVE_ALBUNS_EMPTY,
    isFetching: false,
    empty: true,
    alb,
  };
}

export function fetchThunk(clear) {
  return async (dispatch, getState) => {
    dispatch(requestAlbumStart());
    const state = getState();
    let request = [];
    if (!clear) {
      request = await searchAlbumsAPI(state.serviceReduce.artist);
    }
    try {
      dispatch(requestAlbunsSucess(request));
      const newState = getState();
      const { albuns } = newState.responseReducer;
      if (!clear && albuns.length === 0) return dispatch(requestAlbunsEmpty());
    } catch (error) {
      dispatch(requestAlbunsFailure(error));
    }
  };
}
