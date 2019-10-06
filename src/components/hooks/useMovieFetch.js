import { useState, useEffect, useCallback } from 'react';
import { API_URL, API_KEY } from '../../config';

export const useMovieFetch = movieId => {

    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * Fetch movie data
     */
    const fetchData = useCallback(async endpoint => {
        setLoading(true);
        setError(false);

        try {
            const endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
            const result = await (await fetch(endpoint)).json();

            const creditsEndpoint = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            const directors = creditsResult.crew.filter(member => member.job === 'Director');

            setState({
                ...result,
                actors: creditsResult.cast,
                directors
            });

        } catch (error) {
            setError(true);
            console.log(error);
        }

        setLoading(false);

    }, [movieId]);

    useEffect(() => {
        if (localStorage[movieId]) {
            setState(JSON.parse(localStorage[movieId]));
            setLoading(false);
        } else {
            fetchData();
        }
    }, [movieId, fetchData]);

    useEffect(() => {
        localStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state]);

    return [state, loading, error];
}
