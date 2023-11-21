import { useEffect, useState } from "react";

export function useLocalStorage({id, initialValue}) {
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(id)
        if (jsonValue === null) {
            if (typeof initialValue === 'function'){
                return initialValue;
            } else {
                return initialValue;
            } 

        } else {
            return JSON.parse(jsonValue);
        }
    })
    // store data in our local storage each time the state changes
    useEffect(() => {
        localStorage.setItem(id, JSON.stringify(value))
    }, [value, id])
    return [value, setValue]
}