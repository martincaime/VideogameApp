import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Nav from './components/nav/Nav';
import Details from './components/details/Details';
import Videogames from './components/videogames/Videogames';
import About from './components/about/About';
import Creation from './components/creation/Creation';
import Favorites from './components/favorites/Favorites';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route exact path='/home' component={Videogames} />
      <Route path={['/home', '/videogame/:id', '/about', '/creation', '/favorites']} component={Nav} />
      <Route path='/videogame/:id' component={Details} />
      <Route path='/about' component={About} />
      <Route path='/creation' component={Creation} />
      <Route path='/favorites' component={Favorites} />
    </div>
  );
}

export default App;
