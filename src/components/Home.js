import React, { useState, useEffect } from 'react';
import HeroImage from "./layout/HeroImage";
import SearcBar from "./layout/SearchBar";
import Grid from "./layout/Grid";
import MovieThumb from "./layout/MovieThumb";
import LoadMoreButton from "./layout/LoadMoreButton";
import Spinner from "./layout/Spinner";
import { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../config';

const Home = () => {
    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async endpoint => {
        setLoading(true);
        setError(false);

        try {
            const result = await (await fetch(endpoint)).json();

            console.log(result);

            setState(prev => ({
                ...prev,
                movies: [...result.results],
                heroImage: prev.heroImage || result.results[0],
                currentPage: result.page,
                totalPages: result.total_pages
            }));

        } catch (error) {
            setError(true);
            console.log(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
    }, []);

    return (
        <>
            <HeroImage/>
            <SearcBar/>
            <Grid/>
            <MovieThumb/>
            <Spinner/>
            <LoadMoreButton/>
        </>
    );
}

export default Home;
