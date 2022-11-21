import express from "express";
import cors from "cors";
import axios from "axios";
import { RainNextHourModel } from "./model/rain_next_hour_model";
 
import { getCurrentWeather } from "./api/weather";
import Config from "./config/Config";

const corsOptions = {
    exposedHeaders: 'x-authorization-token',
    origin : '*'
};

const TRAIN_OPTIONS = {
  lat: 43.33,
  lng:-8.36
}

const trainModel = async (lat, lng) => {
  const response = await axios({
    url: `${Config.apiURL}/forecast?latitude=${lat}&longitude=${lng}&hourly=${Config.indicators.join(',')}&timeformat=unixtime&past_days=30`,
    method: 'get',
  });

  // Obtener los datos
  // Entrenar el modelo
  // Evaluar su precision
  RainNextHourModel.train(response.data.hourly);
}

trainModel(TRAIN_OPTIONS.lat, TRAIN_OPTIONS.lng);

export const startExpressApp = () => {
    const app = express();
    const port = process.env.PORT || 8080;

    app.use(cors(corsOptions));
    app.use(express.json());

    app.route("/weather/current").get(async (req, res) => {

      const currentWeather = await getCurrentWeather({
        lat : req.query.lat,
        lng : req.query.lng,
        indicators : Config.indicators
      });

      res.header("Content-Type", "application-json");
      res.end(JSON.stringify(currentWeather));
    });

    app.route("/train").get(async (req, res) => {
      await trainModel(req.query.lat, req.query.lng);
     
      res.header("Content-Type", "application-json");
      res.end(JSON.stringify({status : 'training'}));
    });

    app.route("/predict").get(async (req, res) => {
      const currentWeather = (await getCurrentWeather({
        lat : req.query.lat,
        lng : req.query.lng,
        indicators : Config.indicators
      })).data;

      const prediction = RainNextHourModel.predict(currentWeather);
      res.header("Content-Type", "application-json");
      res.end(JSON.stringify({prediction}));
    });
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
}

startExpressApp();
