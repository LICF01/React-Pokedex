import { Routes, Route } from 'react-router-dom';

//pages
import PokemonsGrid from './pages/PokemonsGrid';
import PokemonView from './pages/PokemonView';

// styles
import './App.css';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<PokemonsGrid />} />
				<Route path='/pokemon/:name' element={<PokemonView />} />
				<Route path='/pokemon/:number' element={<PokemonView />} />
			</Routes>
		</div>
	);
}

export default App;
