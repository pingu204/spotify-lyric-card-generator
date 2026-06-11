import React, { useState } from "react";
import SpotifyLogo from "../../assets/spotify-2026-black-logo.svg"
import type { Info } from "../../hooks/useFetchTracks";
import { getSwatches } from "colorthief";

interface LyricCardProps {
    imageRef?: React.RefObject<HTMLImageElement|null>;
    lyricCardRef?: React.RefObject<HTMLDivElement|null>;
    track: Info;
    lyrics: string[];
    minIdx: number;
    maxIdx: number;
}

const LyricCard: React.FC<LyricCardProps> = ({
    imageRef,
    lyricCardRef,
    track,
    lyrics,
    minIdx,
    maxIdx,
    // fontSize = "text-base",
}) => {
    const [cardColor, setCardColor] = useState("")
    const [accentColor, setAccentColor] = useState("")

    const getCardColor = async () => {
        const swatches = await getSwatches(imageRef?.current);
        console.log(swatches)
        console.log(swatches.LightMuted?.color.hex())
        const bg = swatches.LightMuted?.color.hex() || swatches.Vibrant?.color.hex() || swatches.Muted?.color.hex() as string
        const accent = swatches.LightVibrant?.color.hex() || "white" as string
        setCardColor(bg)
        setAccentColor(accent)
    }

    const getFontSize = () => {
        let sizeClass: string

        switch (((maxIdx as number)-(minIdx as number))+1) {
            case 1:
                sizeClass = "text-4xl/10"
                break;
        
            case 2:
                sizeClass = "text-3xl/7";
                break;

            default:
                sizeClass = "text-xl/6";
        }

        return sizeClass
        }

    return (
        <div ref={lyricCardRef} className={`place-self-center w-[90%] lg:w-[55%] text-left p-5 text-black rounded-xl flex flex-col items-start gap-4`}
            style={{
                backgroundColor: cardColor,
                backgroundImage: accentColor 
                ? `linear-gradient(to top left, ${accentColor}, transparent)` 
                : undefined
            }}
        >
            <div className="flex flex-row gap-2">
                <img crossOrigin="anonymous" ref={imageRef} onLoad={() => getCardColor()} className="h-7 w-auto aspect-square rounded-md" src={track.image[1]["#text"]}/>
                <div className="flex flex-col text-[10px] font-bold items-start gap-[-10px]">
                    <span>{track.name}</span>
                    <span className="text-black/50">{track.artist}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-start">
                {lyrics.slice(minIdx as number, (maxIdx as number) + 1).map((lyric, idx) => 
                    <span className={`${getFontSize()} font-bold`} key={idx}>{lyric}</span>
                )}
            </div>
            <img src={SpotifyLogo} className="h-5 w-auto"/>
        </div>
    )
}

export default LyricCard;