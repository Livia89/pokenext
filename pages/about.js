import Image from 'next/image';

export default function about() {
	return (
		<div className="flex flex-col items-center">
			<h1 className="font-semibold text-4xl m-12 ">About</h1>
			<Image
				src="/images/charizard.png"
				className="mb-6"
				alt="About us"
				width={300}
				height={300}
			/>
			<p className="text-center max-w-3xl">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim,
				ex nec tincidunt lacinia, risus justo pharetra urna, vel rutrum metus
				nulla sit amet risus. Nunc lectus nulla, vehicula id orci at, dignissim
				porttitor nulla. Integer sagittis nibh magna, eu aliquet libero
				condimentum nec
			</p>
		</div>
	);
}
