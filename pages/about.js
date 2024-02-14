import Image from 'next/image';
import { Exo } from 'next/font/google';

const exo = Exo({
	weight: '800',
	subsets: ['latin'],
	display: 'swap',
});

export default function about() {
	return (
		<div className="flex flex-col items-center">
			<h1 className={`font-semibold text-4xl m-12 ${exo.className}`}>About</h1>
			<Image
				src="/images/charizard.png"
				className="mb-6"
				alt="About us"
				width={300}
				height={300}
			/>
			<p className={`text-center max-w-7xl text-2xl  `}>
				Pokémon are mysterious creatures filled with many secrets. Some Pokémon
				live alongside humans and some live in the wild in grassy fields, caves,
				or the sea, but much about their ecology that remains unknown. One of
				their main features is that they can be caught using a Poké Ball, which
				allows them to be carried around.
			</p>
		</div>
	);
}
