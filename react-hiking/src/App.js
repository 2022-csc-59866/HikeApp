import './App.css';
// pages
import { HomePage } from './pages/HomePage';
import { HikePage } from './pages/HikePage';
import { TestPage } from './pages/TestPage';

// router
import { useRoutes } from 'react-router-dom';

function App() {
	const routes = useRoutes([
        { path: '/', element: <HomePage /> },
        { path: 'hike/:hikeLon/:hikeLat/:hikeCity/:hikeState/:hikeCountry', element: <HikePage />},
		{ path: '/test', element: <TestPage/>},
    ]);
	return routes;
}

export default App;