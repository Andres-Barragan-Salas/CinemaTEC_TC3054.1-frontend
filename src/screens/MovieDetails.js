import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import cinemaTecApi from '../api/cinemaTecApi';
import youtube from '../api/youtube';
import LoadingSpinner from '../components/LoadingSpinner';
import { setUser } from '../store/slices/userSlice';
import store from '../store/store';

const MovieDetails = () => {
    const { id } = useParams();

    const movie = useSelector(state => state.movies.find(movie => movie._id === id));
    const { purchasedMovies } = useSelector(state => state.user);

    const [videoId, setVideoId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingPurchase, setLoadingPurchase] = useState(false);

    const purchased = purchasedMovies?.includes(id);

    useEffect(() => {
        const fetchAsync = async () => {
            setLoading(true);
            const res = await youtube.get('/search', {
                params: {
                    q: `${movie.title} trailer`
                }
            })
            setVideoId(res.data.items[0].id.videoId);
            setLoading(false);
        };

        fetchAsync();
    }, [id]);

    const buyMovie = async () => {
        setLoadingPurchase(true);
        try {
            const response = await cinemaTecApi.post('/user/movie/buy', { id });
            store.dispatch(setUser(response.data));
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
        setLoadingPurchase(false);
    }

    return (
        <div className="movies-screen">
            <div className="safe-area">
                {loading
                    ? <LoadingSpinner centered />
                    : <div className="movie-display" key={movie._id}>
                        <div className="movie-image">
                            <iframe src={`https://www.youtube.com/embed/${videoId}`} title={videoId} allowFullScreen />
                        </div>
                        {/* <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`} title={videoId} allowFullScreen></iframe> */}
                        <div className="info-container">
                            <div className="movie-info">
                                <div className="movie-top">
                                    <h2>{movie.title}</h2>
                                    <div className="average"><i className='bx bx-star' /> {movie.vote_average}</div>
                                </div>
                                <label>{movie.release_date.substring(0, 4)}</label>
                                <p>{movie.overview}</p>
                            </div>
                            <div className="options-container">
                                <button disabled={loadingPurchase || purchased} class="text" onClick={buyMovie}>
                                    {!loadingPurchase ? (purchased ? 'Purchased' : 'Purchase') : <LoadingSpinner small colored />}
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default MovieDetails;