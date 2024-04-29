import React, { useState, useEffect } from 'react'
import { useSearchLocationWeather, useWatherByLocation, useWeatherData } from '../api/weatherApi'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

export const SearchPage = () => {
  const initSearchList = [
    'mumbai', 'kolkata', 'chennai', 'bangalore', 'hyderabad', 'kanpur'
  ]
  const [input, setInput] = useState('')
  const searchData = useSearchLocationWeather(input) || []
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <section className='sw-search-page-conatainer'>
      <div>
        <div className='fs-3 fw-bold mb-4 mt-2'>
          {window.innerWidth <= 834 && <span style={{ marginRight: '1em' }}><i className='bi bi-chevron-left' onClick={() => navigate(-1)}></i></span>}
          {window.innerWidth <= 834 ? <span className='sw-col-mgreen'>Search</span> : <span><span className='sw-col-mgreen'>SD</span><span>weather</span></span>}
        </div>
        <div className='sw-search-box'>
          <span className={`sw-s-page-s-icon ${input.length > 0 && 'sw-col-mgreen'}`}>
            <label htmlFor="search-bar"><i className="ri-search-2-line"></i></label>
          </span>
          <input type="text" name="" id="search-bar" className='form-control' placeholder='Search location' spellCheck={false} onChange={e => setInput(e.target.value)} autoComplete='off' />
          <span className={`sw-s-page-s-icon sw-js-end ${location.search === '' && 'sw-col-mgreen'}`} onClick={() => navigate('/')}><i className="bi bi-geo-alt-fill"></i></span>
        </div>
      </div>
      <div className='mt-5'>
        <ul className='sw-s-page-sl-box-ul'>
          {searchData.length === 0 ?
            initSearchList.map((item, index) => {
              return <WeatherBox cityName={item} key={index} />
            }) :
            searchData.map((item, index) => {
              return <WeatherBox longitude={item?.lon} latitude={item?.lat} key={index} />
            })
          }
        </ul>
      </div>
    </section>
  )
}

const WeatherBox = ({ latitude, longitude, cityName }) => {
  const weatherDataByLocation = useWatherByLocation(latitude, longitude)
  const weatherDataByCity = useWeatherData(cityName)

  const loc = (longitude && latitude) ? weatherDataByLocation?.location : weatherDataByCity?.location
  const status = (longitude && latitude) ? weatherDataByLocation?.current : weatherDataByCity?.current

  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    if (longitude && latitude) {
      navigate(`/?q=${latitude},${longitude}`)
    } else { navigate(`/?q=${cityName}`) }
  }
  return (
    <li className={`sw-s-page-sl-box ${click && 'sw-s-page-sl-box-clicked'}`} onMouseDown={() => setClick(true)} onMouseUp={() => setClick(false)} onMouseLeave={() => setClick(false)} onClick={handleClick}>
      <section className='sw-s-w-box-des'>
        <div className='sw-des-box-p'>
          <div className='fs-4'><span className='fw-bold'>{status?.temp_c || '--'}</span><span className='sw-col-mgreen'>°C</span></div>
          <div className='sw-col-light sw-fs-vsmall sw-s-line-h'>{status?.condition.text}</div>
        </div>
        <div>
          <img src={status?.condition.icon} alt="" width={'60px'} draggable='false' />
        </div>
      </section>
      <section className='align-self-end'>
        <div className='sw-fs-small sw-s-line-h'>{loc?.name || '--'}, {loc?.country || '--'}</div>
      </section>
    </li>
  )
}
