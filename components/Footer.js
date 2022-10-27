export default function Footer() {
    const getYear = new Date().getFullYear()
    return (
        <footer className="flex bg-black p-12 justify-center text-white text-md">
            <p className="flex"><span>PokeNext</span><span className="mr-1 text-xs">&copy;</span></p>{getYear}
        </footer>

    )
}