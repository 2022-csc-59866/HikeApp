import './App.css';
// pages
import { HomePage } from './pages/HomePage';
import { HikePage } from './pages/HikePage';

// router
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
		<div className="app">
		      <Routes>
			<Route path="/" element={<HomePage />} />
			<Route path='/hike/:hikeLon/:hikeLat/:hikeCity/:hikeState/:hikeCountry' element={<HikePage /> } />
		      </Routes>
		</div>
	);
}

export default App;
