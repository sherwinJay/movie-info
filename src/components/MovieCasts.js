/** @jsx jsx */
import { jsx, css } from '@emotion/core';

// styles

const leadCast = css`
    overflow-x: scroll;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 20px;
    padding: 20px 0 40px;
    & li {
        max-width: 150px;
        width: 150px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: #555 0px 0px 5px; 
    }
`;
const castName = css`
    font-weight: bold;
`;
const castNameContainer = css`
    padding: 7px 9px;
    line-height: 18px;
    & p {
        font-size: 14px;
    }
`;
const noCastImg = css`
    height: 231px;
    max-height: 231px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #dedede;
`;
const noCasts= css`
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
`;
// end of styles

const MovieCasts = (props) => {

    const getCast = props.cast.slice(0,7).map((cast) => {
        
        let castImage;

        if (cast.profile_path === null){
            castImage = <div css={noCastImg}><p>No Image</p></div>
        }else {
            castImage = <img src={`https://image.tmdb.org/t/p/w154/${cast.profile_path}`} alt={cast.name}/>
        }

        return (
            <li key={cast.cast_id}>
                { castImage }	
                <div css={castNameContainer}>
                    <p css={castName}>{cast.name}</p>
                    <p>{cast.character}</p>
                </div>
            </li>
        );
    });

    const noCast = () => {
        return (
            <div css={noCasts}>
                <p>
                   Sorry, no cast to show.
                </p>
            </div>
        )
    };

    const castContent = () => {
        if (props.cast.length > 0) {
            return (
                <ul css={leadCast}>
                    { getCast }
                </ul>
                )
        } else {
            return noCast()
        }
    }

    return(
        <div>
            <h2>Lead Cast</h2>
            { castContent() }
        </div>
    )

}

export default MovieCasts