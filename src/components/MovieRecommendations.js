import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';	
import MovieRecommendThumbnails from './MovieRecommendThumbnails.js';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles
const container = css`
    background-color: #000;
    & h2{
        padding 35px 20px 0;
        margin-bottom: 0;
        color: #fff;
    }
    & div > div {
        overflow-x: scroll;
        & ul{
            width: 1360px;     
            padding: 25px 20px 35px;
            list-style: none;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            grid-gap: 15px;
        }
    }
`;
const darkenBg = css`
    background-color: rgba(0,0,0,0.7);
`;
const noRecommendations = css`
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
}
`;
// end of styles

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
};

const MovieRecommendations = (props) => {
    const [movieList, setMovielist] = useState([]);

    // use ref
    const prevParams = usePrevious(props.id);
    const prevParams2 = usePrevious(movieList.length);

    console.log(`prevParams2 value: ${prevParams2}`)

    // runs when component mounts
    useEffect(() => {
        fetchData(props.id);
    },[]);

    //  runs when updating contents
    useEffect(() => {
        if(prevParams !== props.id) { 
            fetchData(props.id);
        }
     });

    const fetchData = (movieId) => {
        const apiKey = process.env.REACT_APP_APP_KEY;
        const movieApi = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`;
            
        const fetchMovie = async () => {
            const result = await axios.get(movieApi),
            showMovies = result.data.results.slice(0,5);
            setMovielist(showMovies);
        }

        fetchMovie();
    }
    

    if(movieList.length > 0){
        const bgImage = css`
            background-image: url('https://image.tmdb.org/t/p/original/${movieList[0].backdrop_path}');
            background-size: cover;
            background-position: center;
        `;    
        return (
            <div css={[container, bgImage]}>
                <div css={darkenBg}>
                    <h2>Recommendations</h2>
                    <div>
                        <ul>
                            {movieList.map( movie => 
                                <li key={movie.id}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <MovieRecommendThumbnails
                                            title={movie.title}
                                            overview={movie.overview}
                                            rating={movie.vote_average}
                                            movieImage={movie.backdrop_path}
                                            movieLink={movie.id}
                                            component={"movieCategory"}
                                        />
                                    </Link>
                                </li>  
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div css={noRecommendations}>
            Sorry, no recommended movie.
        </div>
    )
}

export default MovieRecommendations