import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import 'react-awesome-slider/dist/custom-animations/fold-out-animation.css';
import 'react-awesome-slider/dist/custom-animations/open-animation.css';
import 'react-awesome-slider/dist/custom-animations/fall-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';


/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles
const bannerWrapper = css`
    height: 520px;
    position: relative;
    background-color: #000;
    & img {
        opacity: 0.5;
    }
`;
const movieTitle = css`
    font-size: 60px;
    line-height: 50px;
    color: #fff;
    text-align: center;
`;
const movieDetails = css`
    position: relative;
    z-index: 3;
`;
const movieOverview = css`
    color: #fff;
    padding: 10px 20px;
    width: 800px;
    line-height: 22px;
    text-align: center;
    position: relative;
    z-index: 3;
`;
const trailer = css`
    color: #fff;
    padding: 10px 15px;
    margin: 10px auto;
    border: 1px #fff solid;
    border-radius: 20px;
    text-align: center;
    display: block;
    width: 140px;
    position: relative;
    z-index: 3;
`;
// end of styles
const HomePageBanner = (props) => {
    const [movieList, setMovielist] = useState([]);
    const AutoplaySlider = withAutoplay(AwesomeSlider);

    // runs when component mounts
    useEffect(() => {
        fetchData();
     },[]);

    const fetchData = async () => {
        const categoryName = props.url; 
        const apiKey = process.env.REACT_APP_APP_KEY,
            movieApi = `https://api.themoviedb.org/3/movie/${categoryName}?api_key=${apiKey}&language=en-US&page=1`,
            result = await axios.get(movieApi),
            showMovies = result.data.results.slice(0,5);
        setMovielist(showMovies);
    }
    
    const slideMovie = movieList.slice(0,5).map((movie) => {
        return (
            <div key={movie.id} data-src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}>
                <h2 css={[movieTitle, movieDetails]}>{movie.title}</h2>
                <p css={[movieOverview, movieDetails]}>{movie.overview}</p>
                <Link to={`/movie/${movie.id}`}
                    css={trailer} 
                >
                    See Information
                </Link>
            </div>
        );
    });
    
    // const slider = (
    //     <AutoplaySlider 
    //         css={bannerWrapper}
    //         animation="fallAnimation"
    //         play={true}
    //         cancelOnInteraction={false}
    //         interval={6000}
    //         bullets={true}
    //     >
    //       { slideMovie }
    //     </AutoplaySlider>
    // );
    return (
        <AutoplaySlider 
            css={bannerWrapper}
            animation="fallAnimation"
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            bullets={true}
        >
          { slideMovie }
        </AutoplaySlider>
    )
}

export default HomePageBanner