import { useState, useEffect } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useHomeFetch = () => {

    const [state, setState] = useState({ movies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchMovies = async endpoint => {
        setLoading(true);
        setError(false);

        const index = Math.floor(Math.random() * 10);

        try {
            const result = await (await fetch(endpoint)).json();

            setState(prev => ({
                ...prev,
                movies: [...result.results],
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
        fetchMovies(`${API_URL}movie/popular?api_key=${API_KEY}`)
    }, []);

    return [{ state, loading, error }, fetchMovies];
}
