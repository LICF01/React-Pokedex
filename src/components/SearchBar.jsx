import { useState } from 'react';

import './SearchBar.css';

const SearchBar = ({ placeholder, url }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!searchValue) {
			url(`https://pokeapi.co/api/v2/pokemon/`);
			return;
		}

		// check for case and trim leading zeros
		let value = searchValue.toLowerCase().replace(/^0+/, '');

		url(`https://pokeapi.co/api/v2/pokemon/${value}/`);
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
