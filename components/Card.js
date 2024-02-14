import Image from 'next/image';
import Link from 'next/link';

export default function Card({ pokemon }) {
	return (
		<div className="p-4 my-4 border flex flex-col shadow items-center rounded hover:shadow-lg">
			<Image
				alt={pokemon.name}
				className="mb-4 p-4 scale-95 hover:scale-100 transition-all "
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
				width={'200'}
				height={'200'}
			/>
			<small>{`#${pokemon.id}`}</small>
			<h3 className="text-lg font-bold ">{pokemon.name}</h3>
			<Link
				className="py-2 px-6 my-4 rounded text-white bg-red-700 hover:bg-red-500 transition-colors ease-in-out "
				href={`/pokemon/${pokemon.id}`}
			>
				Details
			</Link>
		</div>
	);
}
