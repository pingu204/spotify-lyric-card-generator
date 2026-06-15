import BopieStudios from "../assets/bopie_studios.png"

const Navbar = () => {
    return (<>
        <div className="flex flex-none gap-3 items-center border-b border-b-gray-700 h-navbar w-full px-8">
            <div className="border-gray-500 bg-white/10 flex text-lg aspect-square p-2 rounded-lg text-white">
                <span className="icon-[material-symbols--lyrics-outline-rounded]"></span>
            </div>
            {/* <span className="text-xl font-semibold">Wait, that's a song</span> */}
            <div className="grow"></div>
            <span className="text-sm text-gray-400">Made by <a href="https://jopeth.me" target="_blank" className="hover:opacity-50 hover:underline transition-all font-bold">Bopie</a></span>
        </div>
    </>)
}

export default Navbar;