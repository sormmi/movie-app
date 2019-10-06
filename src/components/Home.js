import React, {useState} from 'react';
import HeroImage from "./layout/HeroImage";
import SearchBar from "./layout/SearchBar";
import Grid from "./layout/Grid";
import MovieThumb from "./layout/MovieThumb";
import LoadMoreButton from "./layout/LoadMoreButton";
import Spinner from "./layout/Spinner";
import {useHomeFetch} from "./hooks/useHomeFetch";
import {POPULAR_BASE_URL, SEARCH_BASE_URL, BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE} from "../configuration";

import NoImage from './images/no_image.jpg';

const Home = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [
        {
            state: {movies, currentPage, totalPages, heroImage},
            loading,
            error
        },
        fetchMovies
    ] = useHomeFetch(searchTerm);

    if (error) return <div>Oops something went wrong :(</div>
    if (!movies[0]) return <Spinner/>

    /**
     * Handle search movies
     */
    const onSearchMovies = search => {
        const endpoint = search ? SEARCH_BASE_URL + search : POPULAR_BASE_URL;

        setSearchTerm(search);
        fetchMovies(endpoint);
    }

    /**
     * Handle load more movies
     */
    const onLoadMoreMovies = () => {
        const searchUrl = `${SEARCH_BASE_URL}${searchTerm}&page=${currentPage + 1}`
        const popularUrl = `${POPULAR_BASE_URL}&page=${currentPage + 1}`
        const endpoint = searchTerm ? searchUrl : popularUrl;

        fetchMovies(endpoint);
    }

    return (
        <>
            {!searchTerm && (
                <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                    title={heroImage.original_title}
                    text={heroImage.overview}
                />
            )}
            <SearchBar searchHandler={onSearchMovies}/>

            <Grid header={searchTerm ? 'Search Results' : 'Popular Movies'}>

                {movies.map(movie => (
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

            { loading && <Spinner/> }

            { currentPage < totalPages && !loading && (
                <LoadMoreButton text="Load More" callback={onLoadMoreMovies}/>
            )}
        </>
    );
}

export default Home;
