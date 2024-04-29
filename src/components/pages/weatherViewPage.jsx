import React, { useState } from 'react'
import { useCurrentLocationWeather, useWatherByLocation, useWeatherData } from '../api/weatherApi'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const WeatherViewPage = () => {

    const navigate = useNavigate();

    const now = new Date()
    const hour = now.getHours();
    const hourFormate = (hour < 10 ? 0 : '') + hour

    const [searchParam] = useSearchParams();
    const query = searchParam.get('q') || ''


    const [lon, setlon] = useState('')
    const [lat, setlat] = useState('')
    useEffect(() => {
        let para1
        let genPara = ''
        for (let i of query) {
            if (i != ',') {
                genPara += i
            }
            else if (i == ',') {
                para1 = genPara
                genPara = ''
            }
        }
        setlat(para1);
        setlon(genPara)
    }, [query])

    const data = useCurrentLocationWeather()
    const locatData = useWatherByLocation(lat, lon)
    const cityData = useWeatherData(query);
    const location = lon ? lat ? locatData?.location : cityData?.location : data?.location;
    const status = lon ? lat ? locatData?.current : cityData?.current : data?.current;

    return (
        <section className='sw-wpage-conatainer'>
            <div className='sw-wpage-conatainer-cont-box'>
                <div className='mb-3 mt-3 sw-d-grid-colmn'>
                    {window.innerWidth <= 834 ?
                        <span className='sw-wp-heading-p fw-bold'><span className='sw-col-mgreen'>SD</span><span>weather</span></span> :
                        <span className='sw-wp-heading-p fw-bold'><span>Weather</span> <span className='sw-col-mgreen'>Forecast</span></span>}
                    {window.innerWidth <= 834 && <span className='sw-js-end mx-4'>
                        <i className='ri-search-2-line fs-4' onClick={() => navigate('/search')}></i>
                    </span>}
                </div>
                <div className='sw-wp-crr-box-forecast-sec'>
                    <section className='sw-wp-page-img-sec'>
                        <img src={(hourFormate > 18 || hourFormate < 5) ? require('../../assets/img/w_img_04.jpg') : require('../../assets/img/w_img_01.jpg')} alt="" draggable='false' />
                    </section>
                    <section className='sw-wp-crr-box-forecast-des'>
                        <div className='sw-wp-fcast-des-b-1'>
                            <div className='fs-5'>Today</div>
                            <div>
                                <div className='sw-temp-para'><span className='fw-bold'>{status?.temp_c || '--'}</span><span className='sw-col-mgreen'>°C</span></div>
                                <div><span className='sw-col-light'>{status?.condition.text}</span></div>
                            </div>
                            <div><span ><i className="bi bi-geo-alt-fill sw-col-mgreen fs-4"></i></span> <span>{location?.name || '--'}, {location?.country || '--'}</span></div>
                        </div>
                        <div className='sw-wp-fcast-des-b-2'>
                            <div className='sw-col-light'><span>{status?.last_updated}</span></div>
                            <div><img src={`${status?.condition.icon}`} alt="" width={'130px'} draggable='false' /></div>
                        </div>
                    </section>
                </div>
            </div>
            <div>
                <div className='mt-4 mb-3'>
                    <span className='fs-5'>Today's Overview</span>
                </div>
                <div>
                    <ul className='sw-t-oview-box-cont-ul'>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-wind sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>{status?.wind_dir || '--'}</div>
                                <div className='sw-t-oview-box-cont-value'>{status?.wind_mph || '--'}/mph</div>
                            </div>}
                        </li>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-water sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>Pressure</div>
                                <div className='sw-t-oview-box-cont-value'>{status?.pressure_mb || '--'}/mb</div>
                            </div>}
                        </li>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-thermometer-sun sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>Real feel</div>
                                <div className='sw-t-oview-box-cont-value'>{status?.feelslike_c || '--'}°C</div>
                            </div>}
                        </li>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-brightness-high sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>UV index</div>
                                <div className='sw-t-oview-box-cont-value'>{status?.uv || '--'}</div>
                            </div>}
                        </li>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-droplet-half sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>Humidity</div>
                                <div className='sw-t-oview-box-cont-value'>{status?.humidity || '--'}</div>
                            </div>}
                        </li>
                        <li className='sw-t-oview-box-cont'>
                            <div><span><i className="bi bi-sunrise-fill sw-col-mgreen fs-4"></i></span></div>
                            {<div>
                                <div className='sw-t-oview-box-cont-type'>Sunrise</div>
                                <div className='sw-t-oview-box-cont-value fs-5'>{status?.astro.sunrise || '--'}</div>
                            </div>}
                        </li>
                    </ul>
                </div>
            </div>
            <div className='my-5'>
                <span className='sw-col-ulight'>Registered by <a href="https://www.weatherapi.com/">weatherApi.com</a>. &copy;SDweather 2024</span>
            </div>
        </section>
    )
}
