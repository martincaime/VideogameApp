const initialState = {
  videogames: [],
  searchedVideogames: [],
  videogameDetails: {},
  genres: [],
  platforms: [],
  filteredVideogames: [],
  addedGames: [],
  videogameFavorite: []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload
      }
    case 'SEARCH_VIDEOGAMES':
      return {
        ...state,
        searchedVideogames: action.payload
      }
    case 'SEARCH_VIDEOGAMES_DETAIL':
      return {
        ...state,
        videogameDetails: action.payload
      }
    case 'GET_GENRES':
      return {
        ...state,
        genres: action.payload
      }
    case 'GET_PLATFORMS':
      return {
        ...state,
        platforms: action.payload
      }
    case 'ADD_GAME':
      return {
        ...state,
        addedGames: [...state.addedGames, action.payload]
      }
    case 'ADD_VIDEOGAME_FAVORITE':
      return {
        ...state,
        videogameFavorite: state.videogameFavorite.concat(action.payload)
      }
    case 'REMOVE_VIDEOGAME_FAVORITE':
      return {
        ...state,
        videogameFavorite: state.videogameFavorite.filter(videogame => videogame.id !== action.payload)
      }
    default:
      return state;
  }
}