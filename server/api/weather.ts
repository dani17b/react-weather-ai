import axios from 'axios';
import Config from '../config/Config';

export type WeatherCurrentProps = {
  lat: number;
  lng: number;
  indicators: string[];
};

export type WeatherProps = {
  lat: number;
  lng: number;
  indicators: string[];
  pastDays: number;
};

const pad = (num : number) => num > 9 ? num + '' : '0' + num; 

export const getCurrentWeather = async (props: WeatherCurrentProps) => {
  const { lat, lng, indicators } = props;

  var now = new Date();
  now.setSeconds(0);
  now.setMinutes(0);
  var nowTS = Math.floor((now.getTime() + (60 * 60 * 1000)) / 1000);
  
  const dateAsStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  const response = await axios({
    url: `${Config.apiURL}/forecast?latitude=${lat}&longitude=${lng}&hourly=${indicators.join(',')}&timeformat=unixtime&start_date=${dateAsStr}&end_date=${dateAsStr}`,
    method: 'get',
  });

  const data = response.data;
  const dataIndex = response.data.hourly.time.indexOf(nowTS);

  let currentWeather = indicators.reduce((acc, item) => {
    acc[item] = data.hourly[item][dataIndex];
    return acc;
  }, {});

  return {
    data : currentWeather,
    units : data.hourly_units
  };
};

export const getWeather = async (props : WeatherProps) => {
  const { lat, lng, indicators, pastDays } = props;

  const response = await axios({
    url: `${Config.apiURL}/forecast?latitude=${lat}&longitude=${lng}&hourly=${indicators.join(',')}&timeformat=unixtime&past_days=14`,
    method: 'get',
  });
}
