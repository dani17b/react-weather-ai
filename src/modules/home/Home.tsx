import React, { useEffect } from 'react';
import './home.scss';
import { useDispatch, useSelector } from 'react-redux';
//import { useTranslation } from 'react-i18next';
import {
  getCurrentWeather,
  getLocationInfo,
  getPredictionNextHour,
} from './actions';
import LottieAnimation, {
  LOTTIE_ANIMATION_TYPE,
} from 'src/components/lottie/Lottie';
import { FaTemperatureLow } from 'react-icons/fa';
import { WiHumidity, WiRain } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { GiWindsock } from 'react-icons/gi';

const RAIN_PRECIPITATION_TARGET = 0.2;

// @ts-ignore
const DetailItem = (props) => {
  const { icon, value, measure } = props;

  return (
    <div className="home__detail__item">
      <div className="home__detail__item__icon">{icon}</div>
      <div className="home__detail__item__data">{value}</div>
      <div className="home__detail__item__measure">{measure}</div>
    </div>
  );
};

export const Home = () => {
  const dispatch = useDispatch();

  const { placeInfo, weather, prediction } = useSelector(
    (state: any) => state.home
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      dispatch(
        getLocationInfo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
    });
  }, [dispatch]);

  useEffect(() => {
    if (placeInfo != null) {
      dispatch(
        getCurrentWeather({
          lat: placeInfo.lat,
          lng: placeInfo.lng,
        })
      );
    }
  }, [placeInfo, dispatch]);

  //const { t } = useTranslation('common');

  return (
    <div className="home">
      {placeInfo && (
        <div className="home__place-info">
          <div className="home__place-info__main">
            {placeInfo.address.residential || placeInfo.address.city}
          </div>
          <div className="home__place-info__secondary">
            {placeInfo.address.municipality}
          </div>
        </div>
      )}

      {weather && (
        <>
          <LottieAnimation
            animation={LOTTIE_ANIMATION_TYPE.WEATHER.DAY.CLOUDY}
            width={200}
            height={200}
          />

          <div className="home__detail">
            <DetailItem
              icon={<FaTemperatureLow />}
              value={weather.data['temperature_2m']}
              measure={weather.units['temperature_2m']}
            />
            <DetailItem
              icon={<WiHumidity />}
              value={weather.data['relativehumidity_2m']}
              measure={weather.units['relativehumidity_2m']}
            />
            <DetailItem
              icon={<MdVisibility />}
              value={weather.data['visibility']}
              measure={weather.units['visibility']}
            />
            <DetailItem
              icon={<GiWindsock />}
              value={weather.data['windspeed_10m']}
              measure={weather.units['windspeed_10m']}
            />
            <DetailItem
              icon={<WiRain />}
              value={weather.data['precipitation']}
              measure={weather.units['precipitation']}
            />
          </div>
        </>
      )}
      <div className="home__prediction">
        {prediction == null && (
          <div
            className="home__prediction-button"
            onClick={() =>
              dispatch(
                getPredictionNextHour({
                  lat: placeInfo.lat,
                  lng: placeInfo.lng,
                })
              )
            }
          >
            ¿Paraguas o piscina?
          </div>
        )}
        {prediction && (
          <div className="home__prediction-result">
            <LottieAnimation
              animation={
                prediction.prediction > RAIN_PRECIPITATION_TARGET
                  ? LOTTIE_ANIMATION_TYPE.SHEEP_RAIN
                  : LOTTIE_ANIMATION_TYPE.SHEEP_SUN
              }
              width={130}
              height={130}
            />
          </div>
        )}
      </div>
    </div>
  );
};
