import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import youtube from '../api/youtube';
import { setMovieDetails } from '../store/slices/movieDetailsSlice';
import store from '../store/store';

import './Movies.css';

const MyMovies = () => {
    const movies = useSelector(state => state.movies);
    const { purchasedMovies } = useSelector(state => state.user);

    const getVideo = async (title, overview, id) => {
        const res = await youtube.get('/search', {
            params: {
                q: `${title} trailer`
            }
        })
        store.dispatch(setMovieDetails({ videoId: res.data.items[0].id.videoId, description: overview, id: id }))
    }
    const renderMovies = () => {
        const myMovies = movies.filter((movie) => purchasedMovies.includes(movie._id))
        if (myMovies.length !== 0) {
            return myMovies.map((movie) => {
                const { _id, title, genre, overview, release_date, vote_average, poster_path } = movie;
                return (
                    <div className="movie-display" key={_id}>
                        <div className="movie-image">
                            <img src={poster_path} alt={title} />
                            <label>{genre}</label>
                        </div>
                        <div className="info-container">
                            <div className="movie-info">
                                <div className="movie-top">
                                    <h2>{title}</h2>
                                    <div className="average"><i className='bx bx-star' /> {vote_average}</div>
                                </div>
                                <label>{release_date.substring(0, 4)}</label>
                                <p>{overview}</p>
                            </div>
                            <div className="options-container">
                                <Link to={`/movie/${_id}`}>
                                    <button class="text">
                                        Watch
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        else {
            return (
                <div>
                    You have no owned movies
                </div>
            )
        }

    };

    return (
        <div className="movies-screen">
            <div className="safe-area">
                <h1>Your <span>Movies</span></h1>
                <div className="movies-container">
                    {renderMovies()}
                </div>
            </div>
        </div>
    );
};

export default MyMovies;