import React, { useEffect } from 'react'
import { useCurrentLocationWeather } from '../api/weatherApi'
import { SearchPage } from './searchPage'
import { WeatherViewPage } from './weatherViewPage'

export const Home = () => {


    return (
        <div className='sw-home-conatainer'>
            {window.innerWidth > 834 && <SearchPage />}
            <WeatherViewPage />
        </div>
    )
}
