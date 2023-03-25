import { useEffect, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

export function useDimensions() {
    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const callback = () => {
            setWindowWidth(Dimensions.get('window').width);
            setWindowHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', callback);
    }, []);

    return { windowWidth, windowHeight };
}
