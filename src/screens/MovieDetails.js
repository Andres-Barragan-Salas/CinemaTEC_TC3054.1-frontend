import React from 'react';
import { useSelector } from 'react-redux';
import cinemaTecApi from '../api/cinemaTecApi';
import store from '../store/store';
import { setUser } from '../store/slices/userSlice';
const MovieDetails = ()=>{
    const {videoId,description, id} = useSelector(state => state.movieDetails);
    const { purchasedMovies } = useSelector(state => state.user);
    const purchased = purchasedMovies?.includes(id);
    const buyMovie = async()=>{
        const movieId = store.getState().movieDetails.id
        try {
            let response;
            console.log(movieId);
            response = await cinemaTecApi.post('/user/movie/buy', { id: movieId });
            store.dispatch(setUser(response.data));
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
    }
    return(
        <div className="ui container">
        {videoId!==null && description!== null? 
        <div> <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoId}`}  title = {videoId} allowFullScreen></iframe> 
        <div>{description}</div>
        <button disabled={purchased?true:false} onClick={() =>buyMovie()}>{!purchased? 'Buy Movie': 'Owned'}</button>
        </div>
        :
        <div> No video has been found </div>}
        </div>
    )
}

export default MovieDetails