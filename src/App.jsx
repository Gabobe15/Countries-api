import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Countries, Country } from './component';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Countries />} />
				<Route path="/country/:index/" element={<Country />} />
			</Routes>
		</Router>
	);
}

export default App;
