import { Link } from 'react-router-dom';	

/** @jsx jsx */
import SearchMovie from './SearchMovie.js';
import { jsx, css } from '@emotion/core';


// styles
const mainHeader = css`
    width: 1200px;
    margin: 0 auto;
	padding: 20px;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 0; 
	align-items: center
`;
const logoWrapper = css`
	color: darkgreen;
	grid-column-start: 1;
	grid-column-end: 4;
	overflow: hidden;
	outline: none;
`;
const logo = css`
	color: #881024;
	display: inline;
	font-size: 42px;
	font-weight: bold;
`;
// end of styles

const AppHeader = () => {
	return (
		<header css={mainHeader}>
			<div css={logoWrapper}>
				<Link to="/">
					<h1 css={logo}>MovieInfo</h1>
				</Link>
			</div>
			<SearchMovie />
		</header>
	);
}

export default AppHeader 