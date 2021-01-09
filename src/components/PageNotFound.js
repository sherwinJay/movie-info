import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const notFoundContainer = css`
    display: grid;
    justify-content: center;
    align-items: center;
    color: #fff;
    min-height: 85vh;
`;

const PageNotFound = () => {
  return (
    <div css={notFoundContainer}>
      <h1>Page Not Found</h1>
    </div>
  )
}

export default PageNotFound
