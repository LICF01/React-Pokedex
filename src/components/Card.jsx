const Card = ({ img, name, number, color }) => {
	return (
		<div className='card' style={{ background: color }}>
			<img src={img} alt={`${name} card`} />
			<p className='card-name'>{name}</p>
			<p className='card-number'>{number}</p>
		</div>
	);
};

export default Card;
