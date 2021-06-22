import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png'
import './Landing.css';

export default function Landing() {
  return (
    <div className='landing'>
      <img className='logoLanding' src={logo} alt='Logo'/>
      <Link className='link' to='/home'>
        <button className='enterButton'>
          <h2>Enter</h2>
        </button>
      </Link>
    </div>
  )
}