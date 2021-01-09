import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';	
import axios from 'axios';
import MovieThumbnails from './MovieThumbnails.js';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const thumbnailsContainer = css`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
`;

const categoryTitle = css`
    text-transform: capitalize;
`;

const MovieCategories = (props) => {
     const [movieList, setMovielist] = useState([]);

     useEffect(() => {
        const fetchData = async () => {
            const categoryName = props.url, 
                apiKey = process.env.REACT_APP_APP_KEY,
                movieApi = `https://api.themoviedb.org/3/movie/${categoryName}?api_key=${apiKey}&language=en-US&page=1`,
                result = await axios.get(movieApi),
                showMovies = result.data.results.slice(0,5);
            setMovielist(showMovies);
        }

        fetchData();
     },[]);

     const getCategoryTitle = () => {
         return props.url.toLowerCase().replace(/_/g, " ");
     }

    //  console.log(movieList);
     if(movieList.length > 0){
        return (
            <div>
            <h2 css={categoryTitle}>{ getCategoryTitle() }</h2>
                <div css={thumbnailsContainer}>
                    { movieList.map(movie => 
                        <li key={movie.id}>
                            <Link to={`/movie/${movie.id}`}>
                                <MovieThumbnails
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
                </div>
            </div>
        )
    }
    // default content
    return (
        <div></div>
    );
 }

 export default MovieCategories