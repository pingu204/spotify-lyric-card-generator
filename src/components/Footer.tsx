import LRCLib from "../assets/lrclib-370c57eb.png"

const Footer = () => {
    return (<div className="text-gray-400 h-navbar flex-none text-sm flex flex-row gap-6 items-center justify-center border-t border-gray-700   ">
        <span className="flex items-center gap-2">
            Powered by 
            <span className="icon-[brandico--lastfm]"></span>
            <img src={LRCLib} className="h-[1em] aspect-square"/>
        </span>
        <div className="border border-gray-600 h-[1em]"></div>
        <a href="https://github.com/pingu204/spotify-lyric-card-generator" target="_blank">
        <span className="flex items-center gap-2">
            View the Repository 
            <span className="icon-[mdi--github]"></span>
        </span>
        </a>
    </div>)   
}

export default Footer;