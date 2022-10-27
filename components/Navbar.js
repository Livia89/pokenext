import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex bg-black p-6 justify-between text-white">
            <div className="flex">
                <Link href='/'><Image src={"/images/pokeball.png"} alt={"PokeNext"} width={40} height={40} /></Link>
                <h1 className="font-semibold text-4xl mx-3">PokeNext</h1>
            </div>
            <ul className="flex items-center">
                <li>
                    <Link className="p-3" href='/'>Home</Link>
                </li>
                <li>
                    <Link className="p-3" href='/about'>About</Link>
                </li>
            </ul>
        </nav>
    )
}