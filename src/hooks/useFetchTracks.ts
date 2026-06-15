import { useEffect, useRef, useState } from "react";

const API_KEY = "fe00a3010a03fabd46b5a781426f1f62"

export interface Info {
    image: {
        "#text": string
    }[];
    name: string;
    artist: string;
}

export function useFetchTracks() {
    const [query, setQuery] = useState<string>("")
    const [chosenIdx, setChosenIdx] = useState<number | null>(null)
    const [tracks, setTracks] = useState<Info[]>([])

    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

    const fetchCoverArt = async (artist: string, track: string) => {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${artist}&track=${track}&format=json`)

        if (response.ok) {
            const data = await response.json()
            return data?.track?.album?.image
        }
    }

    const fetchTracks = async () => {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${API_KEY}&format=json&limit=15`)

        if (response.ok) {
            const data = await response.json()
            const results = data?.results?.trackmatches?.track
            const tracksWithImages = await Promise.all(
                results.map(async (track: Info) => ({
                    ...track,
                    image: await fetchCoverArt(track.artist, track.name),
                }))
            )

            setTracks(tracksWithImages.filter((track) => track.image?.[1]?.["#text"]))
            // setTracks(data?.results?.trackmatches?.track)
            // return data
        }

        return null
    }

    useEffect(() => {
        if (timerRef.current)
            clearTimeout(timerRef.current)

        timerRef.current = setTimeout(() => {
            setTracks([])
            if (query != "") {
                setChosenIdx(null)
                fetchTracks()
            }
        }, 500)
    }, [query])

    return { query, setQuery, fetchTracks, tracks, chosenIdx, setChosenIdx }
}