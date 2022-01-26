import { useEffect, useState, useRef } from 'react';

function useGetPokemons(url) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [pokemons, setPokemons] = useState([]);
	const [hasNext, setHasNext] = useState(null);

	const previousPokemons = useRef(pokemons)

	useEffect(() => {
		const getPokemons = async () => {
			setIsLoading(true);
			if (previousPokemons.length === 1) setPokemons([]);
			try {
				const res = await fetch(url);

				if (!res.ok) {
					// TODO: Implement a modal window
					throw new Error(res.statusText);
				}
				const data = await res.json();

				// if there is results array in data, more than one pokemon has been fetched
				// if not we set an array with only one object Because setPokemon expects an array
				if (data.results) {
					// Because the pokemon Api returns an array of objects with only the name and the url of the pokemons
					// this fetchs the data of the individual pokemons using the url of each object in the previous fetch
					for await (const pokemon of data.results) {
						const res = await fetch(pokemon.url);
						const data = await res.json();
						setPokemons((pokemons) => [...pokemons, data]);
					}

					setHasNext(data.next);
				} else {
					setHasNext(null);
					setPokemons([data]);
				}

				setIsLoading(false);
				setError(null);
			} catch (error) {
				setError(error.message);
				setIsLoading(false);
			}
		};

		getPokemons();
	}, [url]);

	return { isLoading, error, pokemons, hasNext };
}

export default useGetPokemons;
