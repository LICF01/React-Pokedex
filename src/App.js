import { useState, useCallback, useRef, useEffect } from 'react';
import { getPokemons } from './api';

// components
import Card from './components/Card';
import SearchBar from './components/SearchBar';

// styles
import './App.css';

function App() {
	const [pokemonsData, setPokemonsData] = useState([]);
	const [hasNext, setHasNext] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchPokemons = async (
		url = 'https://pokeapi.co/api/v2/pokemon?limit=40'
	) => {
		try {
			setIsLoading(true);
			console.log(url);
			const pokemons = await getPokemons(url);
			const promises = pokemons.results.map(async (pokemon) => {
				return await getPokemons(pokemon.url);
			});

			const data = await Promise.all(promises);

			setHasNext(pokemons.next);
			setPokemonsData((pokemons) => [...pokemons, ...data]);
			setIsLoading(false);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		fetchPokemons();
	}, []);

	const observer = useRef();

	const lastPokemonLoaded = useCallback(
		(node) => {
			// Check if data is loading to prevent api to be called constantly
			if (isLoading) return;
			// Check if there is already a previus ref element and disconnects it to set the new one
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNext) {
					fetchPokemons(hasNext);
				}
			});

			// sets the new element that will be observed
			if (node) observer.current.observe(node);
		},
		[isLoading, hasNext]
	);

	return (
		<div className='App'>
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
			{pokemonsData && (
				<div className='card-grid'>
					{pokemonsData.map((pokemon, index) => {
						if (pokemonsData.length === index + 1) {
							return (
								<div
									ref={lastPokemonLoaded}
									className='ref-container'
									key={pokemon.id}
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
