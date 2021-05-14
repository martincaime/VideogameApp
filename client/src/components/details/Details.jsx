import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import noImage from '../../img/no-image.jpg';
import loading from '../../img/loading.gif';
import './Details.css';

function Details({ videogame }) {
  const [vg, setVg] = useState({})
  useEffect(() => {
    setVg(videogame);
  }, [videogame])
  if (vg.name !== undefined) {
    return (
      <div className='detailsVideogame'>
        <img src={vg.img ? vg.img : noImage} className='detailsVideogameImage' alt='Videogame' />
        <h2 className='descriptionVideogameName'>{vg.name}</h2>
        <div className='detailsGenres'>
          <h3 className='detailsGenresTitle'>Genres</h3>
          <p className='detailsGenresContent'>{vg.genres.map(g => <span key={g.name + g.id}>{g.name}</span>)}</p>
        </div>
        <div className='detailsPlatforms'>
          <h3 className='detailsPlatformsTitle'>Platforms</h3>
          <p className='detailsPlatformsContent'>{vg.platforms.map(p => <span key={p}>{p}</span>)}</p>
        </div>
        <div className='detailsRating'>
          <h3 className='detailsRatingTitle'>Rating</h3>
          <p className='detailsRatingContent'>{vg.rating}</p>
        </div>
        <div className='detailsReleased'>
          <h3 className='detailsReleasedTitle'>Released</h3>
          <p className='detailsReleasedContent'>{vg.released.slice(0, 10)}</p>
        </div>
        <div className='detailsDescription'>
          <h3 className='detailsDescriptionTitle'>Description</h3>
          <div dangerouslySetInnerHTML={{__html: vg.description}}></div>
        </div>
      </div>
    )
  }
  else {
    return (
      <img className='loadingDetails' src={loading} alt='Loading'/>
    )
  }
}

function mapStateToProps(state) {
  return {
    videogame: state.videogameDetails
  }
}

export default connect(mapStateToProps, null)(Details)