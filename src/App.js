import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  AppHeader from './components/AppHeader.js';
import  HomePage from './components/Home.js';
import  MoviePage from './components/MoviePage.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faClock, faStar, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import PageNotFound from './components/PageNotFound';

library.add(fab, faClock, faStar, faPlayCircle);

const HeaderContainer = styled.div`
  background-color: #fff;
`;

// styles
const mainFooter = css`
  background-color: #881024;
  padding: 20px;
  color: #fff;
  text-align: center;
  & p {
    font-size: 12px;
  }
`;
// end of styles

const App = () => {
  return(	
    <Router>
      <div>
        <HeaderContainer>
          <AppHeader/>  
        </HeaderContainer>	
        <Switch>	
          <Route exact path="/" component={ HomePage } />
          <Route path="/movie/:movieId" component={MoviePage} />
          <Route path="/*" component={PageNotFound} />
        </Switch>
        <footer css={mainFooter}>
          <p>© Copyright Reserved 2020</p>
        </footer>
      </div>
    </Router>		 
  );
}

export default App;
