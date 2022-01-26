import { useState, useCallback, useRef } from 'react';
import useGetPokemons from './hooks/useGetPokemons';

// components
import Card from './components/Card';
import SearchBar from './components/SearchBar';

// styles
import './App.css';

function App() {
	const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
	const { isLoading, error, pokemons, hasNext } = useGetPokemons(url);

	const observer = useRef();

	const lastPokemonLoaded = useCallback(
		(node) => {
			// Check if data is loading to prevent api to be called constantly
			if (isLoading) return;
			// Check if there is already a previus ref element and disconnects it to set the new one
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNext) {
					setUrl(hasNext);
				}
			});

			// sets the new element that will be observed
			if (node) observer.current.observe(node);
		},
		[hasNext, isLoading]
	);

	return (
		<div className='App'>
			<div className='top'>
				<h1 className='title'>Pokédex</h1>

				<div className='search'>
					<SearchBar
						placeholder='Search for a Pokémon by name or by its number'
						url={setUrl}
					/>
				</div>
			</div>
			{pokemons && (
				<div className='card-grid'>
					{pokemons.map((pokemon, index) => {
						if (pokemons.length === index + 1) {
							return (
								<div
									ref={lastPokemonLoaded}
									className='ref-container'
								>
									<Card
										key={pokemon.id}
										name={pokemon.name}
										img={
											pokemon.sprites.other[
												'official-artwork'
											].front_default
										}
										number={pokemon.id}
										types={pokemon.types}
									/>{' '}
								</div>
							);
						} else {
							return (
								<Card
									key={pokemon.id}
									name={pokemon.name}
									img={
										pokemon.sprites.other[
											'official-artwork'
										].front_default
									}
									number={pokemon.id}
									types={pokemon.types}
								/>
							);
						}
					})}
				</div>
			)}
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
		</div>
	);
}

export default App;
