import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getGenres, getVideogames, searchVideogames } from '../../redux/Actions';
import Videogame from '../videogame/Videogame';
import Filter from '../filter/Filter';
import Pagination from '../pagination/Pagination';
import noImage from '../../img/no-image.jpg';
import loading from '../../img/loading.gif';
import './Videogames.css';


function Videogames({ videogames, location, searchVideogames, searchedVideogames, getGenres, getVideogames }) {
  const [vg, setVg] = useState([]);
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=') + 1)))
    }
  }, [location.search])

  useEffect(() => {
    getVideogames();
    getGenres();
  }, [getVideogames, getGenres])

  useEffect(() => {
    if (searchedVideogames.length > 0) {
      setVg(searchedVideogames)
    }
    else {
      setVg(videogames)
    }
  }, [videogames, searchedVideogames])

  useEffect(() => {
    return searchVideogames('')
  }, [searchVideogames])

  function sorting(param) {
    switch (param) {
      case 'A-Z':
        return setVg([...vg].sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          else if (a.name < b.name) {
            return -1;
          }
          else return 0;
        }))
      case 'Z-A':
        return setVg([...vg].sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          else if (a.name < b.name) {
            return 1;
          }
          else return 0;
        }));
      case 'ASC-RATING':
        return setVg([...vg].sort((a, b) => {
          return b.rating - a.rating;
        }));
      case 'DESC-RATING':
        return setVg([...vg].sort((a, b) => {
          return a.rating - b.rating;
        }));
      default:
        return setVg([...videogames]);
    }
  }

  function filtering(param) {
    let numeric = /^[0-9]+$/
    if (param) {
      if(param === 'user') {
        return setVg(vg.filter(v => !numeric.test(v.id)))
      }
      else if(param === 'notuser') {
        return setVg(vg.filter(v => numeric.test(v.id)))
      }
      else {
      return setVg(vg.filter(v => v.genres.find(g => g.name === param)));
      }
    }
    else {
      return setVg([...videogames]);
    }
  }

  return (
    <div>
      <Filter filter={filtering} sort={sorting} />
      {videogames.length > 0 ?
        <div className='videogames'>
          {vg.slice((page - 1) * 15, page * 15).map(v =>
            <div key={v.id}>
              <Videogame
                key={v.id}
                id={v.id}
                name={v.name}
                genres={v.genres.length > 0 ? v.genres : [{ name: 'No Genres' }]}
                img={v.img ? v.img : noImage}
              />
            </div>)}
        </div>
        :
        <div className='noVideogames'>
          <img className='loading' src={loading} alt='Loading'/>
        </div>}
      <Pagination allGames={vg} page={page} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    videogames: state.videogames,
    searchedVideogames: state.searchedVideogames,
    addedGames: state.addedGames
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchVideogames: (name) => dispatch(searchVideogames(name)),
    getVideogames: () => dispatch(getVideogames()),
    getGenres: () => dispatch(getGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogames)