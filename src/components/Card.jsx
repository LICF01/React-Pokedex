// styles
import './Card.css';

const Card = ({ img, name, number }) => {
	return (
		<div className='card'>
			<img src={img} alt={`${name} card`} />
			<p className='card-name'>{name}</p>
			<p className='card-number'>{number}</p>
		</div>
	);
};

export default Card;
