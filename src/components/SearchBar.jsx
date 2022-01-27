import { useState } from 'react';
import { getPokemons } from '../api';

import './SearchBar.css';

const SearchBar = ({ placeholder, setPokemon, fetchPokemons, setHasNext }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!searchValue) {
			setPokemon([]);
			fetchPokemons();
			return;
		}

		// check for case and trim leading zeros
		let value = searchValue.toLowerCase().replace(/^0+/, '');

		const pokemon = await getPokemons(
			`https://pokeapi.co/api/v2/pokemon/${value}/`
		);

		setPokemon([pokemon]);
		setHasNext(null);
	};

	return (
		<form className='search-form' onSubmit={handleSubmit}>
			<div className='search-input'>
				<input
					type='text'
					name='search'
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<i className='fas fa-search'></i>
			</div>
		</form>
	);
};

export default SearchBar;
