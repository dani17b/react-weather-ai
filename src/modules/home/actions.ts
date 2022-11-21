import axios from 'axios';
import { Config } from '../../config/Config';

export const GET_CURRENT_WEATHER_REQUEST = 'GET_CURRENT_WEATHER_REQUEST';
export const GET_CURRENT_WEATHER_RESPONSE = 'GET_CURRENT_WEATHER_RESPONSE';
export const GET_LOCATION_INFO_REQUEST = 'GET_LOCATION_INFO_REQUEST';
export const GET_LOCATION_INFO_RESPONSE = 'GET_LOCATION_INFO_RESPONSE';
export const GET_PREDICTION_NEXT_HOUR_REQUEST =
  'GET_PREDICTION_NEXT_HOUR_REQUEST';
export const GET_PREDICTION_NEXT_HOUR_RESPONSE =
  'GET_PREDICTION_NEXT_HOUR_RESPONSE';

// @ts-ignore
export const getCurrentWeather = (props) => {
  const { lat, lng } = props;

  return (dispatch: any) => {
    dispatch({
      type: GET_CURRENT_WEATHER_REQUEST,
    });

    axios({
      url: `${Config.serviceURL}/weather/current?lat=${lat}&lng=${lng}`,
      method: 'get',
    }).then((response) => {
      dispatch({
        type: GET_CURRENT_WEATHER_RESPONSE,
        weather: response.data,
      });
    });
  };
};

// @ts-ignore
export const getPredictionNextHour = (props) => {
  const { lat, lng } = props;

  return (dispatch: any) => {
    dispatch({
      type: GET_PREDICTION_NEXT_HOUR_REQUEST,
    });

    axios({
      url: `${Config.serviceURL}/predict?lat=${lat}&lng=${lng}`,
      method: 'get',
    }).then((response) => {
      dispatch({
        type: GET_PREDICTION_NEXT_HOUR_RESPONSE,
        prediction: response.data,
      });
    });
  };
};

// @ts-ignore
export const getLocationInfo = (props) => {
  const { lat, lng } = props;

  return (dispatch: any) => {
    dispatch({
      type: GET_LOCATION_INFO_REQUEST,
    });

    axios({
      url: `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      method: 'get',
    }).then((response) => {
      dispatch({
        type: GET_LOCATION_INFO_RESPONSE,
        placeInfo: {
          ...response.data,
          lat,
          lng,
        },
      });
    });
  };
};
