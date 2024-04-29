import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useCurrentLocation } from "../utils/currentCityInfo";


export const useWeatherData = (location) => {
    const env = process.env;
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchData();
    }, [location])

    const fetchData = async () => {
        try {
            const URL = `${env.REACT_APP_WEATHER_API_URL}/current.json?key=${env.REACT_APP_API_KEY} &q=${location}&aqi=yes`

            const ASTROURL = `${env.REACT_APP_WEATHER_API_URL}/astronomy.json?key=${env.REACT_APP_API_KEY} &q=${location}&aqi=yes`
            const response = await axios.get(URL)
            const astroRes = await axios.get(ASTROURL)
            response.data.current['astro'] = astroRes.data.astronomy.astro
            setData(response.data)
        } catch (error) {
            console.error('Failed API Fetch ', error)
        }
    }

    return data
}

export const useCurrentLocationWeather = () => {
    const env = process.env;
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const URL = `${env.REACT_APP_WEATHER_API_URL}/current.json?key=${env.REACT_APP_API_KEY} &q=${latitude},${longitude}&aqi=yes`
                        const ASTROURL = `${env.REACT_APP_WEATHER_API_URL}/astronomy.json?key=${env.REACT_APP_API_KEY} &q=${latitude},${longitude}&aqi=yes`
                        const response = await axios.get(URL)
                        const astroRes = await axios.get(ASTROURL)
                        response.data.current['astro'] = astroRes.data.astronomy.astro
                        setData(response.data)
                    } catch (error) {
                        console.error('Failed API Fetch ', error)
                    }
                },
                (error) => {
                    console.error('Error getting location', error);
                }
            );
        } else {
            alert('Geolocation unsuported');
        }
    };

    return data
}

export const useWatherByLocation = (latitude, longitude) => {
    const env = process.env;
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchData();
    }, [latitude])

    const fetchData = async () => {
        try {
            const URL = `${env.REACT_APP_WEATHER_API_URL}/current.json?key=${env.REACT_APP_API_KEY} &q=${latitude},${longitude}&aqi=yes`
            const ASTROURL = `${env.REACT_APP_WEATHER_API_URL}/astronomy.json?key=${env.REACT_APP_API_KEY} &q=${latitude},${longitude}&aqi=yes`
            const response = await axios.get(URL)
            const astroRes = await axios.get(ASTROURL)
            response.data.current['astro'] = astroRes.data.astronomy.astro
            setData(response.data)
        } catch (error) {
            console.error('Failed API Fetch', error)
        }

    };

    return data
}

export const useSearchLocationWeather = (keyward) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const url = `${process.env.REACT_APP_WEATHER_API_URL}/search.json?key=${process.env.REACT_APP_API_KEY} &q=${keyward}&aqi=no`
            try {
                const res = await axios.get(url);
                setData(res.data)
            } catch (error) {
                console.error('Error on search');
            }
        }
        fetchData()
    }, [keyward])

    return data
}