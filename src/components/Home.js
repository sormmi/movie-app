import React, {useState} from 'react';
import HeroImage from "./layout/HeroImage";
import SearcBar from "./layout/SearchBar";
import Grid from "./layout/Grid";
import MovieThumb from "./layout/MovieThumb";
import LoadMoreButton from "./layout/LoadMoreButton";
import Spinner from "./layout/Spinner";
import {useHomeFetch} from "./hooks/useHomeFetch";
import {BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../config";

import NoImage from './images/no_image.jpg';

const Home = () => {

    const [{state, loading, error}, fetchMovies] = useHomeFetch();
    const [searchTerm, setSearchTerm] = useState('');

    if (error) return <div>Oops something went wrong :(</div>
    if (!state.movies[0]) return <Spinner/>

    return (
        <>
            <HeroImage
                image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.heroImage.backdrop_path}`}
                title={state.heroImage.original_title}
                text={state.heroImage.overview}
            />

            <SearcBar/>

            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>

                {state.movies.map(movie => (
                    <MovieThumb
                        key={movie.id}
                        clickable
                        image={movie.poster_path
                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                            : NoImage
                        }
                        movieId={movie.id}
                        movieName={movie.original_title}
                    />
                ))}

            </Grid>

            <LoadMoreButton/>
        </>
    );
}

export default Home;
