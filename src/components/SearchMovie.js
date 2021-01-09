import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';	
import axios from 'axios';

/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles
const formContainer = css`
    position: relative;
`;
const inputStyle = css`
    width: 100%;
    padding: 8px 10px;
    border-radius: 15px;
    border: 1px solid #000;
    outline: none;
    & :focus{
        outline: none;
    }
`;
const movieListContainer = css`
    position: absolute;
    width: 100%;
    background-color: #fff;
    border-radius: 0px 0px 10px 10px;
    z-index: 5;
    overflow: hidden;
    & li a{
        padding: 12px 25px;
        display: block;
        &:hover{
            background-color: #dedede;
        }
    }
`;
const noResult = css`
    padding: 20px;
`;
// end of styles

const SearchMovie = () => {
    const [searchVal, setSearchVal] = useState("");
    const [movieList, setMovielist] = useState([]);
    const [focus, setFocus] = useState(false);
    
    useEffect(() => { 
        const apiKey = process.env.REACT_APP_APP_KEY;						
        const movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchVal}&page=1&include_adult=false"`;
        
        const fetchData = async () => {
            const result = await axios.get(movieApi);
            if(searchVal.length < 2) {
                setMovielist([]);    
            } else{
                setMovielist(result.data.results);
            }
        }
        if(searchVal.length > 0){
            fetchData();
        }
     },[searchVal]);

    const _onBlur = () => {
        setTimeout(() => {
            if (focus) {
                setFocus(false);
            }
        },1000);
    };

    const _onFocus = () => {
        if (!focus) {
            setFocus(true);
        }
    };

    const getSearch = (e) => {
        setSearchVal(e.target.value);
    };

    const showMovieList = movieList.slice(0,9).map((movie) => {
        return (
            <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title} </Link>
            </li>
        )   
    });

    const noMovie = () => {
        return (
            <li css={noResult}>NO RESULT</li>
        )
    };

    const searchList = movieList.length > 0 ? showMovieList : noMovie();
    
    console.log(movieList);

    //  conditional css
     const displayContent =css`
        display: ${focus && searchVal.length > 1 ? "block" : "none"};
    `;

    return (
        <form css={formContainer}>
            <input type="text" 
                placeholder="search" 
                value={searchVal} 
                onChange={getSearch}
                css={inputStyle}
                onBlur={_onBlur}
                onFocus={_onFocus}
            />
            <ul css={[movieListContainer, displayContent]}>
                {searchList}
            </ul>
        </form>
    )
}

export default SearchMovie