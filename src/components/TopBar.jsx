import SearchBar from './SearchBar';
import './TopBar.css';

const TopBar = ({ fetchPokemons, setPokemonsData, setHasNext }) => {
	return (
		<div className='top'>
			<h1 className='title'>Pokédex</h1>

			<div className='search'>
				<SearchBar
					placeholder='Search for a Pokémon by name or number'
					fetchPokemons={fetchPokemons}
					setPokemon={setPokemonsData}
					setHasNext={setHasNext}
				/>
			</div>
		</div>
	);
};

export default TopBar;
