import * as tf from '@tensorflow/tfjs';

export const trainModel = async (data) => {
    console.log("train:",data);
    const volumes = data.volume;
    const rates = data.rate;

    const volumeTensor = tf.tensor2d(volumes, [volumes.length, 1]);
    const rateTensor = tf.tensor2d(rates, [rates.length, 1]);

    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

    await model.fit(volumeTensor, rateTensor, {
        epochs: 100,
        callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' })
    });

    return model;
};

export const predictRate = async (model, volume) => {
    const volumeTensor = tf.tensor2d([volume], [1, 1]);
    console.log("predict rate:",model,volume)
    const prediction = model.predict(volumeTensor);
    let newVar = await prediction.data();
    return newVar[0];
};
