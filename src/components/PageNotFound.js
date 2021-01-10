import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

const notFoundContainer = css`
    display: grid;
    justify-content: center;
    align-items: center;
    color: #fff;
    min-height: 85vh;
`;
const linkText = css`
  text-align: center;
  margin-top: 15px;
  text-decoration: underline;
  color: #fff;
` 

const PageNotFound = () => {
  return (
    <div css={notFoundContainer}>
      <div>
        <h1>
          Page Not Found
        </h1>
        <Link to="/" css={linkText}>
          Go back to home page.
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
