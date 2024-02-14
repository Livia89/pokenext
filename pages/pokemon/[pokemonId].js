import Image from 'next/image';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Progress } from 'flowbite-react';
import { Exo } from 'next/font/google';

const exo = Exo({
	weight: '800',
	subsets: ['latin'],
	display: 'swap',
});

const api = 'https://pokeapi.co/api/v2/pokemon/';
const apiAbility = 'https://pokeapi.co/api/v2/ability/';

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

	const result = await fetch(`${apiAbility}/${id}`);
	const abilityData = await result.json();
	const description = abilityData.effect_entries
		.map(value => value)
		.filter(value => value.language.name === 'en')?.[0];

	return { props: { pokemon: { ...data, description: description.effect } } };
};

// app test case
export default function Pokemon({ pokemon }) {
	const router = useRouter();
	// waiting data
	if (router.isFallback) {
		return <div className="flex justify-center">Loading...</div>;
	}
	return (
		<div className="flex flex-col  items-center space-y-16  p-6">
			<p
				className={`text-4xl max-w-md bg-red-700 p-6 rounded font-bold text-white  ${exo.className}`}
			>
				{pokemon.name.toUpperCase()}
			</p>
			<div className={`text-lg text-center`}>{pokemon.description}</div>
			<div className="w-11/12">
				<div className="   items-center  flex md:flex-row  flex-col-reverse ">
					<div className="space-y-4 w-full  ">
						<h2 className="font-semibold text-2xl text-center">Base stats</h2>

						{pokemon?.stats.map((type, index) => {
							const { base_stat, stat } = { ...type };
							const newName = stat.name.split('-').join(' ');
							const colors = [
								'red',
								'pink',
								'yellow',
								'green',
								'indigo',
								'blue',
								'indigo',
								'purple',
							];
							return (
								<div key={index}>
									<div className=" text-left text-sm font-semibold text-gray-500">
										{newName.charAt(0).toUpperCase() + newName.slice(1)}
									</div>
									<Progress
										progress={base_stat}
										color={colors[index]}
										size="md"
									/>
								</div>
							);
						})}
					</div>
					<div className="w-full flex items-center text-center">
						<Image
							className="ml-auto"
							src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
							alt={pokemon.name}
							width={360}
							height={360}
						/>
					</div>
				</div>
			</div>

			<div className="w-72 text-center mt-12 flex flex-col space-y-8">
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
