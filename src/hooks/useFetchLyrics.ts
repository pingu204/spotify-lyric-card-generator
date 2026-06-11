import { useState } from "react";

export function useFetchLyrics() {
    const [lyrics, setLyrics] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const fetchLyrics = async (track: string, artist: string) => {
        setLoading(true)
        const response = await fetch(`https://lrclib.net/api/get?artist_name=${artist}&track_name=${track}`)

        if (response.ok) {
            const data = await response.json()
            // setLoading(false)
            setLyrics(data.plainLyrics.split("\n").filter((line: string) => line.trim() !== ""))
        }
        setLoading(false)
    }

    return { lyrics, setLyrics, fetchLyrics, loading, setLoading, }
}