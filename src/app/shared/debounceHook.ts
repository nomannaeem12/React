import React, {useEffect, useState} from 'react';

export function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number, deps: React.DependencyList = []) {
    const [timeoutId, setTimeoutId] = useState<number>(0);

    useEffect(() => {
        const newTimeoutId = setTimeout(callback, delay);
        setTimeoutId(newTimeoutId);
        return () => clearTimeout(newTimeoutId);
    }, deps);
    return () => clearTimeout(timeoutId);
}
