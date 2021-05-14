import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addVideogameFavorite, removeVideogameFavorite, searchVideogameDetail } from '../../redux/Actions';
import star from '../../img/star.png';
import './Videogame.css'

function Videogame(props) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (props.favorite.filter(videogame => videogame.name === props.name).length > 0) {
      setActive(true);
    }
    else {
      setActive(false);
    }
  }, [active, props.name, props.favorite])

  function toggle() {
    setActive(!active);
  }

  function addToFavorite() {
    if (props.favorite.filter(videogame => videogame.name === props.name).length > 0) {
      return props.removeVideogameFavorite(props.id);
    }
    else {
      return props.addVideogameFavorite(props);
    }
  }
  return (
    <div className='videogameCard'>
      <img src={props.img} className='videogameImage' alt='Videogame' />
      <Link to={`/videogame/${props.id}`}>
        <button onClick={() => props.searchVideogameDetail(props.id)} className='buttonInfo'>
          <h2 className='videogameName'>{props.name}</h2>
        </button>
      </Link>
      <div className='genresInfo'>
        <p className='allGenres'>{props.genres.map(g => <span key={g.name + g.id}>{g.name}</span>)}</p>
      </div>
      <button className='favoriteVideogame' onClick={() => { addToFavorite(); toggle() }}>
        <img className={active ? 'active' : 'inactive'} src={star} alt='Star' />
      </button>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    favorite: state.videogameFavorite,
    videogames: state.videogames
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addVideogameFavorite: videogame => dispatch(addVideogameFavorite(videogame)),
    removeVideogameFavorite: videogame => dispatch(removeVideogameFavorite(videogame)),
    searchVideogameDetail: videogame => dispatch(searchVideogameDetail(videogame))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogame);