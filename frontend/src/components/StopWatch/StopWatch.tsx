import React, { useEffect, useState } from 'react';

export const StopWatch: React.FC = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (isRunning) {
            timer = setInterval(() => {
                setTime((prev) => prev + 10);
            }, 10);
        } else if(!isRunning && timer) {
            clearInterval(timer);
        }
        return () => {
            if (timer) clearInterval(timer);
        }
    }, [isRunning])
    
    const formatMillisecondsToTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const ms = Math.floor(milliseconds % 1000 / 10) // Capture two digits for milliseconds
            .toString()
            .padStart(2, '0');
    
        return `${minutes}:${seconds}:${ms}`;
    };

    return (
        <span 
            className='text-8xl mx-auto'
            onMouseEnter={() => setIsRunning(true)}
            onMouseLeave={() => setIsRunning(false)}
        >
            {formatMillisecondsToTime(time)}
        </span>
    );
}