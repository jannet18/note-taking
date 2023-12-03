import { useEffect, useState } from "react";

const useLocalStorage = ({key, initialValue}) => {
    const [value, setValue] = useState(() => {
        const jsonValue = JSON.parse(localStorage.getItem([key])) || initialValue;
        if (jsonValue == null) {
            if (typeof initialValue === 'function'){
                return initialValue();
            } else {
                return initialValue;
            } 
        }
    })
    // store data in our local storage each time the state changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])
    return [value, setValue]
}
export default useLocalStorage;