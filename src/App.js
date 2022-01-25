import { useState, useEffect, useCallback, useRef } from 'react';
import useGetPokemons from './hooks/useGetPokemons';

// components
import Card from './components/Card';
import SearchBar from './components/SearchBar';

// styles
import './App.css';

function App() {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	const [searched, setSearched] = useState(false);
	const { isPending, error, pokemons, hasNext } = useGetPokemons(
		url,
		searched,
		setSearched
	);

	const loader = useRef(null);

	const handleObserver = useCallback(
		(entries) => {
			const target = entries[0];

			if (isPending) return;
			if (target.isIntersecting && hasNext !== null) {
				setUrl(hasNext);
			}
		},
		[hasNext, isPending]
	);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '200px',
			threshold: 0,
		};
		const observer = new IntersectionObserver(handleObserver, option);
		if (loader.current) observer.observe(loader.current);
	}, [handleObserver]);

	return (
		<div className='App'>
			<div className='top'>
				<h1 className='title'>Pokédex</h1>

				<div className='search'>
					<SearchBar
						placeholder='Search for a Pokémon by name or by its number'
						url={setUrl}
						searched={setSearched}
					/>
				</div>
			</div>
			{pokemons && (
				<div className='card-grid'>
					{pokemons.map((pokemon) => (
						<Card
							key={pokemon.id}
							name={pokemon.name}
							img={
								pokemon.sprites.other['official-artwork']
									.front_default
							}
							number={pokemon.id}
							types={pokemon.types}
						/>
					))}
				</div>
			)}
			{isPending ? <p>Loading...</p> : <div ref={loader} />}
			{error && <p>{error}</p>}
		</div>
	);
}

export default App;
