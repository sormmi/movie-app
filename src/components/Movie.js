import React from 'react';
import Navigation from "./layout/Navigation";
import MovieInfo from "./layout/MovieInfo";
import MovieInfoBar from "./layout/MovieInfoBar";
import Grid from "./layout/Grid";
import Actor from "./layout/Actor";
import Spinner from "./layout/Spinner";

import {useMovieFetch} from './hooks/useMovieFetch';

const Movie = ({ movieId }) => {

    const [movie, loading, error] = useMovieFetch(movieId);

    if (error) return <div>Something went wrong...</div>

    if (loading || !movie.directors) return <Spinner/>

    return (
        <>
            <Navigation movieName={movie.original_title}/>
            <MovieInfo movie={movie}/>
            <MovieInfoBar budget={movie.budget} revenue={movie.revenue} time={movie.runtime}/>
            <Grid header="Actors">
                {movie.actors.map(actor => (
                    <Actor key={actor.credit_id} actor={actor} />
                ))}
            </Grid>
        </>
    );
}

export default Movie;
