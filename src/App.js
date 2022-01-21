import { useEffect, useState } from 'react';

// components
import Card from './components/Card';

// styles
import './App.css';

const ditto = {
	name: 'ditto',
	id: 132,
	img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
	color: 'purple',
};

function App() {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [allPokemons, setAllPokemons] = useState([]);
	const [loadMore, setLoadMore] = useState(
		'https://pokeapi.co/api/v2/pokemon/'
	);

	const getAllPokemons = async () => {
		setIsPending(true);
		try {
			const res = await fetch(loadMore);

			if (!res.ok) {
				throw new Error(res.statusText);
			}

			const data = await res.json();

			for await (const pokemon of data.results) {
				const res = await fetch(pokemon.url);
				const data = await res.json();
				setAllPokemons((pokemons) => [...pokemons, data]);
				
			}

			setData(data);
			setIsPending(false);
			setError(null);
		} catch (error) {
			setError(error.message);
			setIsPending(false);
		}
	};

	useEffect(() => {
		getAllPokemons();
	}, []);

	console.log(allPokemons);

	return (
		<div className='App'>
			<h1>Pokédex</h1>
			<p>Search for a Pokémon by name or by its Pokédex number</p>
			<div className='card-grid'>
				{allPokemons.map((pokemon) => (
					<Card
						name={pokemon.name}
						img={pokemon.sprites.other["official-artwork"].front_default}
						number={pokemon.id}
						types={pokemon.types}
						key={pokemon.id}
					/>
				))}
			</div>
		</div>
	);
}

export default App;
