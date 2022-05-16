import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import cinemaTecApi from './api/cinemaTecApi';
import { setUser } from './store/slices/userSlice';
import { setMovies } from './store/slices/moviesSlice';
import { setLists } from './store/slices/listsSlice';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import store from './store/store';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Movies from './screens/Movies';
import Lists from './screens/Lists';
import ListDetail from './screens/ListDetail';
import NotFound from './screens/NotFound';

import './App.css';

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
				?	<LoadingSpinner centered />
				:	<>
						<Header />
						<Routes>
							<Route exact path="/" element={<Movies />} />
							<Route exact path="/lists" element={<Lists />} />
							<Route exact path="/lists/:id" element={<ListDetail />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</>
			}
		</div>
	);
}

export default App;
