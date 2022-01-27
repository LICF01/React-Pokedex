import { Routes, Route} from 'react-router-dom';

//pages
import PokemonsGrid from './pages/PokemonsGrid';

// styles
import './App.css';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<PokemonsGrid />} />
			</Routes>
		</div>
	);
}

export default App;
