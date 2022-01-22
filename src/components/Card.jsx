// styles
import './Card.css';

const Card = ({ img, name, number, types}) => {
	return (
		<div
			className='card'
			style={{
				backgroundColor: `var(--type-${types[0].type.name})`,
			}}
		>
			<div className='card-img'>
				<img src={img} alt={`${name} card`} />
			</div>
			<div className='card-info'>
				<div className='pokemon-types'>
					{types.map((type) => (
						<p key={type.type.name}>{type.type.name}</p>
					))}
				</div>
				<p className='card-name'>{name}</p>
				<p className='card-number'>{String(number).padStart(3, 0)}</p>
			</div>
		</div>
	);
};

export default Card;
