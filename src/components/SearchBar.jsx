import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, url, searched }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!searchValue) {
			url(`https://pokeapi.co/api/v2/pokemon/`);
			return;
		}
		searched(true);
		url(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`);
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
				<i class='fas fa-search'></i>
			</div>
		</form>
	);
};

export default SearchBar;
