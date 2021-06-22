import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addGame } from '../../redux/Actions';
import './Creation.css';

function Creation({ genres, platforms, addGame }) {
  const [errors, setErrors] = useState({});
  const [newGame, setNewGame] = useState({
    name: '',
    genres: [],
    description: '',
    released: '',
    rating: 0,
    platforms: []
  });

  function handleSubmit(e) {
    e.preventDefault();
    addGame(newGame);
    alert('Videogame created');
  }

  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    }
    if (!input.description) {
      errors.description = 'Description is required';
    }
    if (input.genres.length === 0) {
      errors.genres = 'There must be at least one genre';
    }
    if (input.platforms.length === 0) {
      errors.platforms = 'There must be at least one platform';
    }
    return errors;
  };

  function handleChange(e) {
    setNewGame({
      ...newGame, [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...newGame, [e.target.name]: e.target.value
    }))
  }

  return (
    <div className='createVideogame'>
      <form onSubmit={e => handleSubmit(e)}>
        <h3>Name</h3>
        <input className='nameVideogameForm' type='text' name='name' onChange={handleChange} />
        {errors.name && <p className='danger'>{errors.name}</p>}
        <h3>Genres</h3>
        <label className='genresVideogameForm'>
          {genres.map(g => <label className='checkboxLabel' key={g.id}>
            <input type='checkbox' name={g.name} value={g.id}
              onChange={e => setNewGame({ ...newGame, genres: [...newGame.genres, e.target.value] })} />{g.name}
          </label>
          )}
        </label>
        {errors.genres && <p className='danger'>{errors.genres}</p>}
        <h3>Platforms</h3>
        <label className='platformsVideogameForm'>
          {platforms.map(p => <label className='checkboxLabel' key={p.id}>
            <input type='checkbox' name={p.name} value={p.id}
              onChange={e => setNewGame({ ...newGame, platforms: [...newGame.platforms, e.target.value] })} />{p.name}
          </label>
          )}
        </label>
        {errors.platforms && <p className='danger'>{errors.platforms}</p>}
        <h3>Rating</h3>
        <input className='ratingVideogameForm' type='number' min='0' max='5' step='0.1' name='rating' onChange={e => setNewGame({ ...newGame, rating: e.target.value })} />
        <h3>Release date</h3>
        <input className='releasedVideogameForm' type='date' name='release date' onChange={e => setNewGame({ ...newGame, released: e.target.value })} />
        <h3>Description</h3>
        <textarea className='descriptionVideogameForm' name='description' onChange={handleChange} />
        {errors.description && <p className='danger'>{errors.description}</p>}
        {!errors.name && !errors.description && !errors.genres && !errors.platforms &&
          <button className='buttonCreateVideogame' type='submit' onClick={handleSubmit}>Create</button>}
      </form>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    genres: state.genres,
    platforms: state.platforms
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGame: info => dispatch(addGame(info))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Creation)