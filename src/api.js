export const getPokemons = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error);
	}
};

export const getSpecieData = async (name) => {
	try {
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${name}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(error);
	}

}
