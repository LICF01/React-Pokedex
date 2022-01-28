import './Stats.css';

const renderSwitch = (param) => {
	switch (param) {
		case 'special-attack':
			return 'Sp Attack:';
		case 'special-defense':
			return 'Sp defense:';
		default:
			return `${param}:`;
	}
};

const Stats = ({ stats, type }) => {
	return (
		<div>
			<h3
				className='stats-title'
				style={{
					color: `var(--type-${type})`,
				}}
			>
				Base Stats
			</h3>
			<ul className='stats'>
				{stats.map((stat) => {
					return (
						<li className='stats-item'>
							<span className='stats-item__name'>
								{renderSwitch(stat.stat.name)}
							</span>
							<span className='stats-item__range'>
								{stat.base_stat}
							</span>
							<div className='stats-item__bar'>
								<div
									style={{
										backgroundColor: `var(--type-${type})`,
										width: `${stat.base_stat}%`,
									}}
								/>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Stats;
