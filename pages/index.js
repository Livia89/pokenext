import Image from 'next/image';
import Card from '../components/Card';

export async function getStaticProps() {
	const maxPokemons = 50;
	const api = 'https://pokeapi.co/api/v2/pokemon/';
	const res = await fetch(`${api}/?limit=${maxPokemons}`);
	const data = await res.json();

	// Add pokemon index
	data.results.forEach((item, index) => (item.id = index + 1));

	return { props: { pokemons: data.results } };
}

export default function Home({ pokemons }) {
	return (
		<>
			<div className="flex justify-center items-center space-x-4 my-12">
				<h1 className="text-3xl font-bold">
					Poke<span className="text-red-700">Next</span>
				</h1>
				<Image
					src={'/images/pokeball.png'}
					alt={'PokeNext'}
					width={50}
					height={50}
				/>
			</div>
			<div className="flex flex-wrap justify-between">
				{pokemons.map(pokemon => (
					<Card key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
