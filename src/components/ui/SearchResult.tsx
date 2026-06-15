interface SearchResultProps {
    name: string;
    artist: string;
    image: Array<{ "#text": string }>;
    onClick: () => void;
}

const SearchResult = ({
    name,
    artist,
    image,
    onClick,
}: SearchResultProps) => {
    return (
        <div onClick={onClick} className="flex items-center gap-3 transition-all bg-gray-800 hover:border hover:-translate-y-1 cursor-pointer hover:bg-gray-700 p-3 border-gray-700 hover:border-gray-600 rounded-lg">
                <img src={image?.[1]?.["#text"]} className="h-10 w-auto aspect-square rounded-md"/>
                <div className="font-medium flex flex-col text-xs items-start text-align truncate">
                    <span>{name}</span>
                    <span className="opacity-50">{artist}</span>
                </div>
                {/* <button onClick={() => setChosenIdx(idx)}>Choose</button> */}
        </div>
    )
}

export default SearchResult;