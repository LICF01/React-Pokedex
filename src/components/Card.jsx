// styles
import './Card.css';

const Card = ({ img, name, number, types }) => {
	return (
		<div
			className='card'
			style={{
				backgroundColor: `var(--type-${types[0].type.name}-light)`,
			}}
		>
			<div className='card-img'>
				<img src={img} alt={`${name} card`} />
			</div>
			<div className='card-info'>
				<p className='card-name'>{name}</p>
				<p className='card-number'>{String(number).padStart(3,0)}</p>
			</div>
		</div>
	);
};

export default Card;
