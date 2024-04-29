import { useEffect, useState } from "react"
import axios from "axios"

const useCurrentLocation = () => {
    const [location, setLocation] = useState()
    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude })
                    },
                    (error) => {
                        console.log('Error getting location', error);
                    }
                );
            } else {
                console.log('Geolocation is not supported');
            }
        };

        getLocation();
    }, [])

    return location
}

export { useCurrentLocation }