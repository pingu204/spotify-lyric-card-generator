import { useCallback, useState } from "react"

export function useLyricIndices(lyrics: string[]) {
    const [minIdx, setMinIdx] = useState<number | null>(null)
    const [maxIdx, setMaxIdx] = useState<number | null>(null)

    const selectLine = useCallback((idx: number) => {
        console.log("DEBUG", idx, minIdx, maxIdx)
        setMinIdx(prev => (prev == null
            ? idx
            : prev == idx
                ? Math.min(prev + 1, lyrics.length)
                : Math.min(idx, prev))
        )
        setMaxIdx(prev => (prev == null
            ? idx
            : prev == idx
                ? Math.max(prev - 1, 0)
                : Math.max(idx, prev))
        )
    }, [lyrics])

    const resetIdx = () => {
        setMinIdx(null)
        setMaxIdx(null)
    }

    return {
        maxIdx, setMaxIdx,
        minIdx, setMinIdx,
        selectLine,
        resetIdx,
    }
}