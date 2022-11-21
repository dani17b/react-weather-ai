import * as tf from '@tensorflow/tfjs-node';

const INPUTS_KEYS = [
    'relativehumidity_2m',
    'temperature_2m',
    'visibility',
    'windspeed_10m',
    'cloudcover'
];

const OUTPUTS_KEYS = [
    'precipitation'
];

const MODEL_CONFIG = {
    epochs : 150
};

var MODEL = {
    model : null,
    status : 'not-trained'
}

export const RainNextHourModel = {
    prepareData : (data) => {
        return {
            inputs : data.time.map((timeKey, i) => INPUTS_KEYS.map(key => data[key][i])),
            outputs : data.time.map((timeKey, i) => OUTPUTS_KEYS.map(key => data[key][i] > 0 ? 1 : 0))
        }
    },
    train : (data) => {
        MODEL.model = tf.sequential();
        MODEL.model.add(
            tf.layers.dense({
                units: 4, 
                inputShape: [INPUTS_KEYS.length],
                activation: "relu"
            })
        );

        MODEL.model.add(
            tf.layers.dense({
                units: 8,
                activation: "relu"
            })
        );

        MODEL.model.add(
            tf.layers.dense({
                units: 1,
            })
        );

        MODEL.model.compile({optimizer: tf.train.sgd(0.001), loss: "meanSquaredError" });

        // Preparar los datos
        const values = RainNextHourModel.prepareData(data);

        // Generate some synthetic data for training.
        const xs = tf.tensor(values.inputs);
        const ys = tf.tensor(values.outputs);

        // Train the model using the data.
        MODEL.status = 'training';
        MODEL.model.fit(xs, ys,{
            epochs : MODEL_CONFIG.epochs
        }).then(() => {
            MODEL.status = 'trained';
            
        });
    },
    predict : (data) => {
        const input = INPUTS_KEYS.map(key => data[key]);

        const prediction : any =  MODEL.model.predict(tf.tensor2d([input]));

        return prediction.dataSync()[0];
    }
}