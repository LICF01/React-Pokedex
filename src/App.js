import { useState, useEffect, useCallback, useRef } from 'react';
import useGetPokemons from './hooks/useGetPokemons';

// components
import Card from './components/Card';
import SearchBar from './components/SearchBar';

// styles
import './App.css';

function App() {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	const [searched, setSearched] = useState(false)
	const { isPending, error, pokemons, hasNext } = useGetPokemons(url, searched);

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
			<h1>Pokédex</h1>
			<p>Search for a Pokémon by name or by its Pokédex number</p>
			<SearchBar placeholder='Search for a pokemon' url={setUrl} searched={setSearched}/>
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
