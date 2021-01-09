/** @jsxFrag React.Fragment */
import React from 'react';
import MovieCategories from './MovieCategories.js';
import HomePageBanner from './HomePageBanner.js';
import styled from 'styled-components';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ScrollToTop from './ScrollToTop.js';

const MainContainer = styled.div`
    width: 1200px;
    margin: 0 auto;
    padding: 50px 20px;
`;
// styles
const categoryContainer = css`
    width: 1200px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 35px;
    margin: 0 auto;
    padding: 50px;
`;
// end of styles

const HomePage = () => {
    
    return(
        <>
            <ScrollToTop/>
            <HomePageBanner url="popular"/>
            <div css={categoryContainer}>
                <MovieCategories url="upcoming"/>
                <MovieCategories url="now_playing"/>
                <MovieCategories url="top_rated"/>
            </div>
        </>
    );
}
export default HomePage