import {useEffect, useState} from 'react';

export default function useClientLoaded() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return loaded;
}
