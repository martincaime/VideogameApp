import React from 'react';
import { connect } from 'react-redux';
import Videogame from '../videogame/Videogame.jsx';
import './Favorites.css';
import noImage from '../../img/no-image.jpg';

function Favorites(props) {
  return (
    <div>
      <div className='favorites'>
        {props.favorite.map(v =>
          <div key={v.id}>
            <Videogame
                key={v.id}
                id={v.id}
                name={v.name}
                genres={v.genres.length > 0 ? v.genres : [{name: 'No Genres'}]}
                img={v.img ? v.img : noImage}
              />
          </div>)}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    favorite: state.videogameFavorite
  }
}

export default connect(mapStateToProps, null)(Favorites);