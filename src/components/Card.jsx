import { useNavigate } from "react-router-dom";

// styles
import './Card.css';

const Card = ({ img, name, number, types }) => {

  let navigate = useNavigate();

	const handleClick = () => {
          navigate(`/pokemon/${name}`);
	};

	return (
		<div
			className='card'
			style={{
				backgroundColor: `var(--type-${types[0].type.name})`,
				boxShadow: `0 0 10px var(--type-${types[0].type.name})`,
			}}
			onClick={handleClick}
		>
			<div className='card-img'>
				<img src={img} alt={`${name} card`} />
			</div>
			<div className='card-info'>
				<p className='card-name'>{name}</p>
				<div className='pokemon-types'>
					{types.map((type) => (
						<div className='pokemon-type' key={type.type.name}>
							<div
								className='pokemon-type-icon'
								style={{
									backgroundImage: `url(/img/${type.type.name}_Type_Icon.svg)`,
								}}
							></div>
							<p className='pokemon-type-name'>
								{type.type.name}
							</p>
						</div>
					))}
				</div>
				<p className='card-number'>{String(number).padStart(3, 0)}</p>
			</div>
		</div>
	);
};

export default Card;
