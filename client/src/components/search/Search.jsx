import React, { useState } from 'react';
import { searchVideogames } from '../../redux/Actions';
import { connect } from 'react-redux';
import './Search.css'

function Search(props) {
  const [videogame, setVideogame] = useState('')
  function handleChange(event) {
    setVideogame(event.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.searchVideogames(videogame);
    setVideogame('')
  }
  return (
    <div className='searchBar'>
      <form
        onSubmit={(e) => { handleSubmit(e) }}>
        <input className='searchInput' type='text' placeholder='Videogame' value={videogame}
          onChange={(e) => handleChange(e)} />
        <input className='searchButton' type='submit' value='Search' />
      </form>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    searchVideogames: (videogames) => dispatch(searchVideogames(videogames))
  }
}

export default connect(null, mapDispatchToProps)(Search);