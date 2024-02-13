import Image from 'next/image';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

const api = 'https://pokeapi.co/api/v2/pokemon/';
export const getStaticPaths = async () => {
	const maxPokemons = 150;
	const res = await fetch(`${api}/?limit=${maxPokemons}`);
	const data = await res.json();

	// params
	const paths = data.results.map((pokemon, index) => {
		return {
			params: { pokemonId: (index + 1).toString() },
		};
	});

	// return { paths, fallback: false }
	return { paths, fallback: true };
};

export const getStaticProps = async context => {
	const id = context.params.pokemonId;

	const res = await fetch(`${api}/${id}`);
	const data = await res.json();

	return { props: { pokemon: data } };
};

// app test case
export default function Pokemon({ pokemon }) {
	const router = useRouter();
	// waiting data
	if (router.isFallback) {
		return <div className="flex justify-center">Loading...</div>;
	}
	return (
		<div className="flex flex-col items-center space-y-3 my-12">
			<p className="text-4xl max-w-md bg-red-300 py-4 px-8 rounded font-bold ">
				{pokemon.name}
			</p>
			<div>
				<Image
					className="my-6"
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
					alt={pokemon.name}
					width={300}
					height={300}
				/>
			</div>
			<div className="w-72 text-center flex flex-col space-y-4">
				<div>
					<h3 className="text-lg font-bold ">Id: </h3>
					<p>#{pokemon.id}</p>
				</div>
				<div>
					<h3 className="text-lg font-bold ">Tipo: </h3>
					<div className="flex space-x-2  items-center justify-center ">
						{pokemon.types.map((item, index) => (
							<div
								key={index}
								className="bg-gray-800 rounded py-2 px-4 text-center"
							>
								<FontAwesomeIcon
									className={'text-red-500 mr-2'}
									icon={faFireAlt}
								/>
								<small className="text-white uppercase  ">
									{item.type.name}
								</small>
							</div>
						))}
					</div>
				</div>
				<div className="flex space-x-4 justify-center my-6">
					<div>
						<h3 className="text-lg font-bold ">Height: </h3>
						<span>{pokemon.height * 10} cm</span>
					</div>
					<div className="border-r-2"></div>
					<div>
						<h3 className="text-lg font-bold ">Weight: </h3>
						<span>{pokemon.weight / 10} kg</span>
					</div>
				</div>
			</div>
		</div>
	);
}
