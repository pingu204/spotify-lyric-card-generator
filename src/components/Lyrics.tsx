import React, { useCallback, useEffect, useRef, useState } from "react"
import { useFetchLyrics } from "../hooks/useFetchLyrics"
import type { Info } from "../hooks/useFetchTracks"
import Lyric from "./ui/Lyric";
import LyricCard from "./ui/LyricCard";
import { useLyricIndices } from "../hooks/useLyricIndices";
import Button from "./ui/Button";
import SearchResult from "./ui/SearchResult";
import Skeleton from "./ui/Skeleton";
import { toPng } from "html-to-image";

interface Props {
    track: Info
    setChosenIdx: React.Dispatch<React.SetStateAction<number|null>>;
}

const Lyrics = ({
    track,
    setChosenIdx,
}: Props) => {
    const { loading, lyrics, fetchLyrics } = useFetchLyrics()

    const {
        maxIdx,
        minIdx,
        selectLine,
        resetIdx,
    } = useLyricIndices(lyrics)

    const [showPreview, setShowPreview] = useState(false)
    const [downloading, setDownloading] = useState(false)

    const imageRef = useRef(null)
    const lyricCardRef = useRef(null)

    const onButtonClick = useCallback(() => {
        setDownloading(true)

        if (lyricCardRef.current === null) {
            return
        }

        toPng(lyricCardRef.current, { cacheBust: true, pixelRatio:5 })
        .then((dataUrl) => {
            const link = document.createElement('a')
            link.download = 'my-image-name.png'
            link.href = dataUrl
            link.click()
        })
        .catch((err) => {
            console.log(err)
        })
        setTimeout(() => setDownloading(false), 1500)
    }, [lyricCardRef])

    useEffect(() => {
        fetchLyrics(track.name, track.artist)
    }, [track])

    return (<>
        {!showPreview && <>
            <div className="flex justify-between">
                <Button onClick={() => setChosenIdx(null)}>
                    <span className="icon-[icon-park-solid--left-one]"></span>            
                    Choose Another Song
                </Button>
                {!showPreview && <Button onClick={() => setShowPreview(true)}>       
                    Proceed
                    <span className="icon-[icon-park-solid--right-one]"></span>     
                </Button>}
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center font-bold place-self-center">
                <span className="text-gray-400">Choose lyrics from</span>
                <SearchResult 
                    onClick={() => {}}
                    name={track.name}
                    artist={track.artist}
                    image={track.image}
                />
            </div>
            <div className={`overflow-y-auto py-4 grow scrollbar-none flex flex-col ${loading ? "gap-4" : "gap-2"}`}>
                {loading 
                    ? <>
                        <span className="text-white font-medium">Loading lyrics. This may take up to a minute.</span>
                        {[...Array(3)].map((_,index) => <Skeleton key={index} />)}
                    </>
                    : lyrics.length == 0
                        ? <span>No lyrics found.</span>
                        : <>
                        {lyrics.map((lyric, idx) => 
                            <Lyric 
                                key={idx} 
                                idx={idx}
                                maxIdx={maxIdx}
                                minIdx={minIdx}
                                onClick={() => {
                                    selectLine(idx)
                                    if (maxIdx != null && minIdx != null && idx==maxIdx && idx==minIdx)
                                        resetIdx()
                                }}
                                line={lyric}
                            />
                        )}
                    </>
                }
            </div>
        </>}
        
        {showPreview && <>
            <div className="flex justify-between">
                <Button onClick={() => setShowPreview(false)}>
                    <span className="icon-[icon-park-solid--left-one]"></span>            
                    Choose New Lyrics
                </Button>
            </div>
            <div className="flex flex-col grow justify-center gap-4">
            <LyricCard
                lyrics={lyrics}
                minIdx={minIdx as number}
                maxIdx={maxIdx as number}
                imageRef={imageRef}
                lyricCardRef={lyricCardRef}
                track={track}
            />
            <div className="mx-auto">
            <Button onClick={onButtonClick} disabled={downloading}>
                Download
                {downloading 
                    ? <span className="icon-[svg-spinners--180-ring-with-bg] text-lg"></span>
                    : <span className="icon-[material-symbols--download] text-lg"></span>
                }
            </Button>
            </div>
            </div>
        </>}
    </>)
}

export default Lyrics;