/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles


const thumbnailBox = css`
    position: relative;
    overflow: hidden;
    color: #fff;
    height: 210px;
    background-color: #111;
    &:hover > div{
        top: 0;
    }
`;
const thumbnailInfo = css`
    position: absolute;
    background-color: rgba(0,0,0,0.7);
    top: 100%;
    padding: 20px;
    height: 100%;
    transition: 0.25s all ease-in-out;
    & > h4{
        line-height: 22px;
    }
    & > p{
        margin: 7px 0;
        line-height: 18px;
    }
`;
// end of styles

const MovieThumbnails = (props) => {
    let bodyText = props.overview.substr(0, 120);
        bodyText = bodyText.substr(0, bodyText.lastIndexOf(" ")).concat("...");

     //  inline style for thumbnail background
    const backgroundImage = {
        backgroundImage: `url(https://image.tmdb.org/t/p/w300/${props.movieImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };
        
    return(
        <div css={thumbnailBox} style={backgroundImage}>
            <div css={thumbnailInfo}>
                <h4 className="boxTitle">{props.title}</h4>
                <p className="boxRating">Rating: {props.rating}</p>
                <p className="boxOverview">{bodyText}</p>
            </div>
        </div>
    );
}

export default MovieThumbnails