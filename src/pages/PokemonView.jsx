import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemons } from '../api.js';

// styles
import './PokemonView.css';

const PokemonView = () => {
	let { name } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchPokemon = async () => {
		try {
			setIsLoading(true);
			const pokemonData = await getPokemons(
				`https://pokeapi.co/api/v2/pokemon/${name}`
			);
			console.log(pokemonData);
			setPokemon(pokemonData);
			setIsLoading(false);
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	return (
		<>
			{pokemon && (
				<div
					className='view-header'
					style={{
						backgroundColor: `var(--type-${pokemon.types[0].type.name})`,
					}}
				>
					<div className='header-info'>
						<p className='header-info__number'>
							{String(pokemon.id).padStart(3, 0)}
						</p>
						<p className='header-info__name'>{pokemon.name}</p>
						<div className='header-info__types'>
							{pokemon.types.map((type) => (
								<div
									className='header-types'
									key={type.type.name}
								>
									<div
										className='header-type-icon'
										style={{
											backgroundImage: `url(/img/${type.type.name}_Type_Icon.svg)`,
										}}
									></div>
									<p className='header-type-name'>
										{type.type.name}
									</p>
								</div>
							))}
						</div>
					</div>
					<img
						className='header-image'
						src={
							pokemon.sprites.other['official-artwork']
								.front_default
						}
						alt={`${name} view`}
					/>
				</div>
			)}
		</>
	);
};

export default PokemonView;
