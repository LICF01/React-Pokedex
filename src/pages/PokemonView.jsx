import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemons, getSpecieData } from '../api.js';

// styles
import './PokemonView.css';

const PokemonView = () => {
	let { name } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [aditionalData, setAditionalData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const _fetchPokemon = async () => {
		try {
			setIsLoading(true);
			const pokemonData = await getPokemons(
				`https://pokeapi.co/api/v2/pokemon/${name}`
			);
			setPokemon(pokemonData);
			setIsLoading(false);
		} catch (error) {
			setError(error);
		}
	};

	const _fetchSpecie = async () => {
		try {
			setIsLoading(true);
			const aditionalData = await getSpecieData(name);
			setAditionalData(aditionalData);
			setIsLoading(false);
		} catch (error) {
			setError(error);
		}
	};

	const fetchPokemon = useRef(_fetchPokemon).current;
	const fetchSpecie = useRef(_fetchSpecie).current;

	useEffect(() => {
		fetchPokemon();
		fetchSpecie();
	}, [fetchPokemon, fetchSpecie]);

	return (
		<>
			{pokemon && aditionalData && (
				<div
					className='view'
					style={{
						backgroundColor: `var(--type-${pokemon.types[0].type.name})`,
					}}
				>
					<div className='view-info'>
						<p className='view-info__number'>
							{String(pokemon.id).padStart(3, 0)}
						</p>
						<p className='view-info__name'>{pokemon.name}</p>
						<div className='view-info__types'>
							{pokemon.types.map((type) => (
								<div className='view-type' key={type.type.name}>
									<div
										className='view-type-icon'
										style={{
											backgroundImage: `url(/img/${type.type.name}_Type_Icon.svg)`,
										}}
									></div>
									<p className='view-type-name'>
										{type.type.name}
									</p>
								</div>
							))}
						</div>
					</div>
					<img
						className='view-image'
						src={
							pokemon.sprites.other['official-artwork']
								.front_default
						}
						alt={`${name} view`}
					/>
					<div className='view-details'>
						<div className='view-description'>
							<p>
								{
									aditionalData.flavor_text_entries[8]
										.flavor_text
								}
							</p>
						</div>
					</div>
				</div>
			)}
			{isLoading && <p>Loading...</p>}
			{error && <p>{error}</p>}
		</>
	);
};

export default PokemonView;
