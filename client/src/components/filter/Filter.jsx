import React from 'react';
import { connect } from 'react-redux';
import './Filter.css';

function Filter(props) {

  return (
    <div className='filtersAll'>
      <div className='filters'>
        <div className='dropdown'>
          <button className='material-icons dropButton'>filter_list</button>
          <div className='dropdownContent'>
            <button onClick={(e) => { e.preventDefault(); props.filter('user') }}>Created by me</button>
            <button onClick={(e) => { e.preventDefault(); props.filter('notuser') }}>API Videogames</button>
            {props.genres.map(g =>
              <button key={g.name} onClick={(e) => { e.preventDefault(); props.filter(g.name) }}>{g.name}</button>)}
          </div>
        </div>
        <div className='dropdown'>
          <button className='material-icons dropButton'>sort</button>
          <div className='dropdownContent'>
            <button onClick={(e) => { e.preventDefault(); props.sort('') }}>Most Relevant</button>
            <button onClick={(e) => { e.preventDefault(); props.sort('A-Z') }}>A-Z</button>
            <button onClick={(e) => { e.preventDefault(); props.sort('Z-A') }}>Z-A</button>
            <button onClick={(e) => { e.preventDefault(); props.sort('ASC-RATING') }}>Rating ↑</button>
            <button onClick={(e) => { e.preventDefault(); props.sort('DESC-RATING') }}>Rating ↓</button>
          </div>
        </div>
        <div className='dropdown'>
          <button className='material-icons dropButton' onClick={(e) => { e.preventDefault(); props.filter() }}>clear</button>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    genres: state.genres
  }
}

export default connect(mapStateToProps, null)(Filter);