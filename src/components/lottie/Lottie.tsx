import React from 'react';
import Lottie from 'react-lottie';
import lottieLoading from './animations/20641-loading.json';
import lottieWeatherDayMist from './animations/weather/4795-weather-mist.json';
import lottieSheepSun from './animations/8237-swimming-sheep.json';
import lottieSheepRain from './animations/8840-sheep-in-the-middle-of-rain.json';

// https://lottiefiles.com/vdr0uy2wwsoljqtc
export const LOTTIE_ANIMATION_TYPE = {
  LOADING: lottieLoading,
  SHEEP_SUN: lottieSheepSun,
  SHEEP_RAIN: lottieSheepRain,
  WEATHER: {
    DAY: {
      MIST: lottieWeatherDayMist,
      FOGGY: lottieWeatherDayMist,
      SUNNY: lottieWeatherDayMist,
      WINDY: lottieWeatherDayMist,
      THUNDER: lottieWeatherDayMist,
      STORM: lottieWeatherDayMist,
      STORM_SHOWERS: lottieWeatherDayMist,
      SNOW_SUNNY: lottieWeatherDayMist,
      SNOW: lottieWeatherDayMist,
      PARTLY_SHOWER: lottieWeatherDayMist,
      CLOUDY: lottieWeatherDayMist,
    },
    NIGHT: {
      CLEAR: lottieWeatherDayMist,
      SNOW: lottieWeatherDayMist,
      RAINY: lottieWeatherDayMist,
      CLOUDY: lottieWeatherDayMist,
    },
  },
};

const LottieAnimation = (props: any) => {
  const { animation, width, height } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default LottieAnimation;
