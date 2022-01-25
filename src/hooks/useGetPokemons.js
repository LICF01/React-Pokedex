import { useEffect, useState, useCallback } from 'react';

function useGetPokemons(url, searched, setSearched) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [pokemons, setPokemons] = useState([]);
	const [hasNext, setHasNext] = useState(null);

	const getPokemons = useCallback(async () => {
		setIsPending(true);
		try {
			const res = await fetch(url);

			if (!res.ok) {
				// TODO: Implement a modal window
				throw new Error(res.statusText);
			}
			const data = await res.json();

			// Check if a search has been made before, if true cleans the results
			if (searched === true) setPokemons([]);

			// if there is results array in data, more than one pokemon has been fetched
			// if not we set an array with only one object Because setPokemon expects an array
			if (data.results) {
				const newResult = pokemons;
				// Because the pokemon Api returns an array of objects with only the name and the url of the pokemons
				// this fetchs the data of the individual pokemons using the url of each object in the previous fetch
				for await (const pokemon of data.results) {
					const res = await fetch(pokemon.url);
					const data = await res.json();
					newResult.push(data);
				}

				setSearched(false);
				setPokemons(newResult);
				setHasNext(data.next);
			} else {
				setPokemons([data]);
				setHasNext(null);
			}

			setIsPending(false);
			setError(null);
		} catch (error) {
			setError(error.message);
			setIsPending(false);
		}
	}, [url]);

	useEffect(() => {
		getPokemons();
	}, [url, getPokemons]);

	return { isPending, error, pokemons, hasNext };
}

export default useGetPokemons;
