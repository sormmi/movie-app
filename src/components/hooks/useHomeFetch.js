import { useState, useEffect } from 'react';
import { POPULAR_BASE_URL } from '../../config';

export const useHomeFetch = (searchTerm) => {

    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Fetch movies
     */
    const fetchMovies = async endpoint => {
        setLoading(true);
        setError(false);

        const index = Math.floor(Math.random() * 10);

        const isLoadingMore = endpoint.search('page');

        try {
            const result = await (await fetch(endpoint)).json();

            setState(prev => ({
                ...prev,
                movies: isLoadingMore !== -1 ? [...prev.movies, ...result.results] : [...result.results],
                heroImage: prev.heroImage || result.results[index],
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
        if (sessionStorage.homeState) {
            setState(JSON.parse(sessionStorage.homeState));
            setLoading(false);
        } else {
            fetchMovies(POPULAR_BASE_URL);
        }
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            sessionStorage.setItem('homeState', JSON.stringify(state));
        }
    }, [searchTerm, state]);

    return [{ state, loading, error }, fetchMovies];
}
