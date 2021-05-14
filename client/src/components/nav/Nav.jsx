import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../../img/logo.png'

export default function Nav() {
  return (
    <nav className='navBar'>
      <div className='navLinks'>
      <Link to='/home' className='link'>
        <div className='homeNav'>
          <img className='logo' src={logo} alt='Logo'/>
        </div>
      </Link>
      <Link to='/about' className='link'>
        <div className='aboutNav'>
          <h4>About</h4>
        </div>
      </Link>
      <Link to='/favorites' className='link'>
        <div className='favoritesVideogameNav'>
          <h4>Favorites</h4>
        </div>
      </Link>
      </div>
      <Link to='/creation' className='link'>
        <div className='createVideogameNav'>
          <h4>Create Videogame</h4>
        </div>
      </Link>
    </nav>
  )
}