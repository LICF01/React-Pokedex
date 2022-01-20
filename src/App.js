// components
import Card from './components/Card';

// styles
import './App.css';

const ditto = {
	name: 'ditto',
	id: 132,
	img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
	color: 'purple'
};

function App() {
	return (
		<div className='App'>
			<Card
				name={ditto.name}
				img={ditto.img}
				number={ditto.id}
				key={ditto.id}
				color={ditto.color}
			/>
		</div>
	);
}

export default App;
