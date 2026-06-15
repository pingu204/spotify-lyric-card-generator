import { useCallback } from "react";


type LyricProps = {
    minIdx: number|null;
    maxIdx: number|null;
    idx: number;
    onClick: () => void;
    line: string;
};

const Lyric = ({
    minIdx,
    maxIdx,
    idx,
    onClick,
    line,
}: LyricProps) => {

    const getBgColor = useCallback((idx: number) => {
        console.log("TEST", idx, maxIdx, minIdx)
        let bgColor = "bg-gray-800"

        if (minIdx != null && maxIdx != null) {
            
            if (idx == minIdx - 1 || idx == maxIdx + 1)
                bgColor = "bg-blue-900"
            else if (minIdx <= idx && maxIdx >= idx)
                bgColor = "bg-blue-700"
        }

        return bgColor
    }, [minIdx, maxIdx, idx])

    return (
        <span 
            // key={idx} 
            className={`transition-all rounded-xl lg:rounded-lg p-4 font-bold text-2xl ${getBgColor(idx)} hover:-translate-y-1 hover:shadow-md hover:shadow-amber-50/10 hover:border border-gray-700 hover:border-gray-600 cursor-pointer`}
            onClick={onClick}
        >
            {line}
        </span>
    )
}

export default Lyric;