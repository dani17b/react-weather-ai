import {
  GET_CURRENT_WEATHER_REQUEST,
  GET_CURRENT_WEATHER_RESPONSE,
  GET_LOCATION_INFO_REQUEST,
  GET_LOCATION_INFO_RESPONSE,
  GET_PREDICTION_NEXT_HOUR_REQUEST,
  GET_PREDICTION_NEXT_HOUR_RESPONSE,
} from './actions';

const initialState = {
  loading: false,
  weather: null,
  placeInfo: null,
  prediction: null,
  loadingPrediction: false,
};

const home = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LOCATION_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_LOCATION_INFO_RESPONSE:
      return {
        ...state,
        loading: false,
        placeInfo: action.placeInfo,
      };
    case GET_CURRENT_WEATHER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CURRENT_WEATHER_RESPONSE:
      return {
        ...state,
        loading: false,
        weather: action.weather,
      };
    case GET_PREDICTION_NEXT_HOUR_REQUEST:
      return {
        ...state,
        loadingPrediction: true,
      };
    case GET_PREDICTION_NEXT_HOUR_RESPONSE:
      return {
        ...state,
        loadingPrediction: false,
        prediction: action.prediction,
      };
    default:
      return state;
  }
};

export default home;
