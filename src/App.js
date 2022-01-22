import { useCallback, useEffect, useRef, useState } from 'react';
import useGetPokemons from './hooks/useGetPokemons';

// components
import Card from './components/Card';

// styles
import './App.css';

function App() {
	const { isPending, error, pokemons, hasNext } = useGetPokemons(
		'https://pokeapi.co/api/v2/pokemon/'
	);

	return (
		<div className='App'>
			<h1>Pokédex</h1>
			<p>Search for a Pokémon by name or by its Pokédex number</p>
			{isPending && <p>loading...</p>}
			{error && <p>{error}</p>}
			{pokemons && (
				<div className='card-grid'>
					{pokemons.map((pokemon) => (
						<Card
							key={pokemon.name}
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
		</div>
	);
}

export default App;
