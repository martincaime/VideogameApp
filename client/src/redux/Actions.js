import axios from 'axios';

export function getVideogames() {
  return function (dispatch) {
    axios.get('http://localhost:3001/videogames')
      .then((res) => dispatch({
        type: 'GET_VIDEOGAMES',
        payload: res.data
      }))
  }
}

export function searchVideogames(name) {
  if (name !== '') {
    return function (dispatch) {
      axios.get(`http://localhost:3001/videogames?name=${name}`)
        .then((res) => dispatch({
          type: 'SEARCH_VIDEOGAMES',
          payload: res.data
        }))
    }
  }
  else {
    return {
      type: 'SEARCH_VIDEOGAMES',
      payload: []
    }
  }
}

export function searchVideogameDetail(videogame) {
  return function (dispatch) {
    axios.get(`http://localhost:3001/videogame/${videogame}`)
      .then((res) => dispatch({
        type: 'SEARCH_VIDEOGAMES_DETAIL',
        payload: res.data
      }))
  }
}

export function getGenres() {
  return function (dispatch) {
    axios.get(`http://localhost:3001/genres`)
      .then((res) => dispatch({
        type: 'GET_GENRES',
        payload: res.data
      }))
  }
}

export function addGame({ name, genres, description, released, rating, platforms }) {
  return function (dispatch) {
    const Game = { name, genres, description, released, rating, platforms }
    axios.post('http://localhost:3001/videogame', Game)
      .then((res) => {console.log(res.data) ;dispatch({
        type: 'ADD_GAME',
        payload: res.data
      })})
  }
}

export function addVideogameFavorite(videogame) {
  return {
    type: 'ADD_VIDEOGAME_FAVORITE',
    payload: videogame
  };
}

export function removeVideogameFavorite(videogame) {
  return {
    type: 'REMOVE_VIDEOGAME_FAVORITE',
    payload: videogame
  };
}