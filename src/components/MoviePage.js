import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MovieCasts from './MovieCasts';
import MoviePageBanner from './MoviePageBanner';
import MovieRecommendations from './MovieRecommendations';
import MoviePageSidebar from './MoviePageSidebar';

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ScrollToTop from './ScrollToTop';


// styles
// change this later
const movieContentWrapper = css`
    width: 1200px;
    margin: 0 auto;
    padding: 35px 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
`;
const mainContent = css`
    grid-column-start: 1;
    grid-column-end: 5;
    overflow: hidden;
`;
const wrapper = css`
    min-height: 100vh;
`;
// end of comment


// end of styles

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

const MoviePage = (props) => {
    const [movieList, setMovielist] = useState({});
    
    const { match: { params } } = props;
    // use ref
    const prevParams = usePrevious(params.movieId);

    // runs when component mounts 
    useEffect(() => {
        fetchData(params.movieId);
    },[]);

    //  runs when updating contents
     useEffect(() => {
        if(prevParams !== params.movieId) { 
            fetchData(params.movieId);
        }
     });

    const fetchData = (movieID) => {
        const apiKey = process.env.REACT_APP_APP_KEY;
        const movieApi = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&append_to_response=credits,videos`;
        const fetchMovie = async () => {
            const result = await axios.get(movieApi);
            setMovielist(result.data);
         } 
         fetchMovie();
    }

    if(movieList.hasOwnProperty("id")) {
     return(
         <div>
            <ScrollToTop/>
            <MoviePageBanner
                bgImage={movieList.backdrop_path}
                poster={movieList.poster_path}
                title={movieList.title}
                overview={movieList.overview} 
                releaseDate={movieList.release_date}
                tagline={movieList.tagline}
                genres={movieList.genres}
                runtime={movieList.runtime}
                rating={movieList.vote_average}
                credits={movieList.credits}
                videos={movieList.videos}
            />
            <section css={movieContentWrapper}>
                <div css={mainContent}>
                    <MovieCasts
                        cast={movieList.credits.cast}
                        productionCompany={movieList.production_companies}
                        id={movieList.id}
                    />
                    <MovieRecommendations 
                        id={movieList.id}
                    />
                </div>
                <MoviePageSidebar 
                    credits={movieList.credits}
                    budget={movieList.budget}
                    revenue={movieList.revenue}
                    status={movieList.status}
                    productionCompany={movieList.production_companies}
                    id={movieList.id}
                />
            </section>

        </div>
     )
    }
    // if movieList is empty return empty div
    return (
        <div css={wrapper}></div>
    )
}

export default MoviePage