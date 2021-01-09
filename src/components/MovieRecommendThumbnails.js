
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles
const thumbnailContainer = css`
    color: #fff;
    text-align: center;
    line-height: 24px;
    font-weight: bold;
    & > img {
        width: 260px;
        border-radius: 15px;
    }
`;
const noImg = css`
    width: 260px;
    height: 146px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    background-color: #dedede;
    border-radius: 15px;
    margin-bottom: 6px;
`;

// end of styles

const MovieRecommendThumbnails = (props) => {

    // create thumbnail image
    const getThumbnailImg = () => { 
        if(props.movieImage === '' || props.movieImage === null){
            return (
                <p css={noImg}>
                    NO IMAGE
                </p>
            )
        }else{
            return(
                <img src={`https://image.tmdb.org/t/p/w300/${props.movieImage}`} alt={props.title} />
            )
        }
    };
        
    return(
        <div css={thumbnailContainer}>
            { getThumbnailImg() }
            <p className="boxTitle">{props.title}</p>
        </div>
    );
}

export default MovieRecommendThumbnails