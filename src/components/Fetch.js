import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchData = (url) => {
    const fetchMovie = async () => {
        const result = await axios.get(url);
        console.log(result.data)
        return result.data
//   setMovielist(result.data);
    }
    fetchMovie();
} 
export default fetchData