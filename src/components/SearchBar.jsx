import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder, search }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault()
		search(`https://pokeapi.co/api/v2/pokemon/${searchValue}/`)
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input
					type='text'
					name='search'
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</label>
		</form>
	);
};

export default SearchBar;
