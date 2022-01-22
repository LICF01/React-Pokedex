import { useEffect, useState, useCallback } from 'react';

function useGetPokemons(url) {
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);
	const [pokemons, setPokemons] = useState([]);
	const [hasNext, setHasNext] = useState(null);

	const getPokemons = useCallback(async () => {
		setIsPending(true);
		try {
			const res = await fetch(url);

			if (!res.ok) {
				throw new Error(res.statusText);
			}
			const data = await res.json();

			for await (const pokemon of data.results) {
				const res = await fetch(pokemon.url);
				const data = await res.json();
				setPokemons((pokemons) => [...pokemons, data]);
			}

			setHasNext(data.next);
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
