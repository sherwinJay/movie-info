/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// styles
const movieWrapper = css`
    width: 1200px;
    margin: 0 auto;
    padding: 35px 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
`;
const darkBg = css`
    background-color: rgba(22,22,22,0.85);
`;
const moviePoster = css`
    grid-column-start: 1;
    grid-column-end: 2;
    border-radius: 20px;
    width: 280px;
    height: 420px;
`;
const noMoviePoster = css`
    height: 420px;
    background-color: #ccc;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    display: grid;
`;
const movieOverviewContainer = css`
    grid-column-start: 2;
    grid-column-end: 5;
    color: #fff;
    line-height: 22px;
    padding: 40px 0;
    & > h2{
        font-size: 32px;
    }
    & > h4{
        font-size: 24px;
        margin: 30px 0 10px;
        font-weight: normal;
    }
    & > p {
        font-size: 16px;
    }
`;
const movieTagline = css`
    font-style: italic;
    margin-top: 15px;
`;

const iconsWrapper = css`
    padding: 20px 0 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0;
    width: 620px;
    color: #d41434;
    & a {
        color: #d41434;
    }
`;
const iconContainer = css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    font-size: 19px;
`;
const iconsParagraph = css`
    margin-left: -28px;
    font-size: 16px;
    color: #fff;
`;
const crewWrapper = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    & > li p:first-child{
        font-size: 16px;
        font-weight: bold;
        line-height: 18px;
    }
`;
const crewDepartment = css`
    font-style: italic;
`;
// end of styles 

const MoviePageBanner = (props) => {

    //  inline styles
    const bannerBg = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
     };
    
    //  manipulate movie data
    const releaseDate = props.releaseDate.replace(/-/g,"/");

    const showGenres = props.genres.map((genre) => {
        return genre.name;
    }).slice(0,3).toString().replace(/,/g,', ');

    const computeRuntime = () => {
        const computeHours = Math.floor(props.runtime / 60);
        const computeMinutes = props.runtime % 60;

        return `${computeHours}h ${computeMinutes}m`;
    };

    const getCrew = props.credits.crew.map((crew) => {
        if(crew.job === "Director" || crew.job === "Screenplay"){
            return (
                <li key={crew.credit_id}>
                    <p>{crew.name}</p>
                    <p css={crewDepartment}>{crew.job}</p>
                </li>
            )
        }
        return "";
    });

    const getImgPoster = () => {
        if(props.poster === null || props.poster === undefined || props.poster === "" ) {
            return ( 
                <div css={noMoviePoster}>
                    <p>No Image</p>
                </div>
            );
        } else {
            return ( 
                <img css={moviePoster} 
                    src={`https://image.tmdb.org/t/p/w342${props.poster}`} 
                    alt={props.title}
                />
            );
        }
    }

    const getMovieTrailerUrl = () => {
        if(props.videos.results.length > 0 && props.videos.results[0].hasOwnProperty("key")){
            return `https://www.youtube.com/watch?v=${props.videos.results[0].key}`;
        } else {
            return "";
        }
    };
    return (
        <section style={bannerBg}>
            <div css={darkBg}>
                <div css={movieWrapper}>
                    {getImgPoster()}
                    <div css={movieOverviewContainer}>
                        <h2>
                            {props.title}
                        </h2>
                        <p>
                            {`${releaseDate} (US) | ${showGenres}`}
                        </p>
                        <p css={movieTagline}>
                            {props.tagline}
                        </p>
                        <p>
                            {props.overview}
                        </p>
                        <div css={iconsWrapper}>
                            <div css={iconContainer}>
                                <FontAwesomeIcon 
                                    icon="clock" 
                                    size="2x"
                                />
                                <p css={iconsParagraph}>
                                    {computeRuntime()}
                                </p>
                            </div>
                            <div css={iconContainer}>
                                <FontAwesomeIcon 
                                    icon="star" 
                                    size="2x"
                                />
                                <p css={iconsParagraph}>
                                    {props.rating}
                                </p>
                            </div>
                            <div>
                                <a css={iconContainer} 
                                    href={getMovieTrailerUrl()} 
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <FontAwesomeIcon 
                                        icon="play-circle" 
                                        size="2x"
                                    />
                                    <p css={iconsParagraph}>
                                        Play Trailer
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div>
                            <ul css={crewWrapper}>
                                {getCrew}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoviePageBanner

