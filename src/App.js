import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import cinemaTecApi from './api/cinemaTecApi';
import './App.css';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ListDetail from './screens/ListDetail';
import Lists from './screens/Lists';
import Login from './screens/Login';
import MovieDetails from './screens/MovieDetails';
import Movies from './screens/Movies';
import NotFound from './screens/NotFound';
import OwnedMovies from './screens/OwnedMovies';
import SignUp from './screens/SignUp';
import { setLists } from './store/slices/listsSlice';
import { setMovies } from './store/slices/moviesSlice';
import { setUser } from './store/slices/userSlice';
import store from './store/store';

function App() {
	const { token } = useSelector(state => state.auth);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAsync = async () => {
			setLoading(true);
			try {
				// User data
				const userResponse = await cinemaTecApi.get('/user');
				store.dispatch(setUser(userResponse.data));
				// Movies data
				const moviesResponse = await cinemaTecApi.get('/movies');
				store.dispatch(setMovies(moviesResponse.data));
				// Lists data
				const listsResponse = await cinemaTecApi.get('/lists');
				store.dispatch(setLists(listsResponse.data));
			} catch (err) {
				console.error(err);
				alert(err.response.data.error);
			}
			setLoading(false);
		};

		if (token) fetchAsync();
	}, [token]);

	if (!token) {
		return (
			<div className="cinema-tec-app">
				<Routes>
					<Route exact path="/signup" element={<SignUp />} />
					<Route path="*" element={<Login />} />
				</Routes>
			</div>
		);
	}

	return (
		<div className="cinema-tec-app">
			{loading
				? <LoadingSpinner centered />
				: <>
					<Header />
					<Routes>
						<Route exact path="/" element={<Movies />} />
						<Route exact path="/lists" element={<Lists />} />
						<Route exact path="/lists/:id" element={<ListDetail />} />
						<Route exact path="/movie/:id" element={<MovieDetails />} />
						<Route exact path="/my-movies" element={<OwnedMovies />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</>
			}
		</div>
	);
}

export default App;
