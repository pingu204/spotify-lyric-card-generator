import { useFetchTracks } from "../hooks/useFetchTracks";
import Lyrics from "./Lyrics";
import SearchResult from "./ui/SearchResult";
import Hero from "../assets/hero.png"

const Search = () => {
    const { query, setQuery, tracks, chosenIdx, setChosenIdx } = useFetchTracks()

    console.log("TRACKS", tracks)

    return (<>
        <section className="w-full bg-grid grow overflow-y-hidden flex flex-col">
        <div className="w-[90%] grow overflow-y-hidden lg:w-[50%] place-self-center flex flex-col gap-4 py-8 justify-center">
            {(chosenIdx == null) && <>
                <div className="flex flex-col items-center justify-center grow">
                    <div className={`${(tracks.length != 0) ? "h-25" : "h-75"} transition-all`}>
                        <img src={Hero} className={`grow transition-all mb-6 h-full object-contain rounded-lg`} />
                    </div>
                    <span className="text-2xl lg:text-3xl font-semibold text-center mb-2">
                        Wait, that's a song...
                    </span>
                    <span className="text-sm lg:text-base text-gray-500">
                        Quote a lyric from your favorite song in the prettiest way possible
                    </span>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <input
                        className="p-3 w-full bg-gray-700 text-white rounded-md focus:outline-0 text-sm lg:text-base"
                        type="text"
                        placeholder="Enter a keyword for the song/artist (e.g., Maki)"
                        value={query || ""}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span className="text-left text-xs text-gray-500">
                        Use specific keywords for better search results
                    </span>
                </div>
                {query && <span className="text-sm lg:text-base text-gray-500 flex gap-2 font-semibold">
                    Showing results for 
                    <span className="text-text">'{query}'</span>
                    <span className="grow"></span>
                    <span className="uppercase text-xs text-white hidden lg:block">{tracks.length} results</span>
                </span>}
            </>}
            {(chosenIdx == null) && <div className="overflow-y-auto scrollbar-none grid grid-cols-2 py-3 gap-4">
                {tracks.map(({name, artist, image}, idx) => <>
                    {image?.[1]?.["#text"] && 
                        <SearchResult 
                            key={idx}
                            name={name}
                            artist={artist}
                            image={image}
                            onClick={() => setChosenIdx(idx)}
                        />
                    }
                </>)}
            </div>}
            {(chosenIdx != null) &&
                <Lyrics 
                    setChosenIdx={setChosenIdx}
                    track={tracks[chosenIdx]}
                />
            }
        </div>
        </section>
    </>)
}

export default Search;