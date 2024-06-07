import * as tf from '@tensorflow/tfjs';

// 假設數據從某個 API 加載
const loadData = async () => {
    const response = await fetch('http://127.0.0.1:3000/ffrs');
    const data = await response.json();

    const volumes = data.map(item => item.volume);
    const rates = data.map(item => item.rate);

    return { volumes, rates };
};

const createModel = () => {
    const model = tf.sequential();

    // 第一個隱藏層
    model.add(tf.layers.dense({ units: 50, inputShape: [1], activation: 'relu' }));

    // 第二個隱藏層
    model.add(tf.layers.dense({ units: 50, activation: 'relu' }));

    // 輸出層
    model.add(tf.layers.dense({ units: 1 }));

    model.compile({
        optimizer: 'adam',
        loss: 'meanSquaredError',
        metrics: ['mse'],
    });

    return model;
};

const trainModel = async (model, volumes, rates) => {
    const volumeTensor = tf.tensor2d(volumes, [volumes.length, 1]);
    const rateTensor = tf.tensor2d(rates, [rates.length, 1]);

    await model.fit(volumeTensor, rateTensor, {
        epochs: 100,
        batchSize: 32,
        validationSplit: 0.2,
        callbacks: tf.callbacks.earlyStopping({ monitor: 'val_loss' })
    });
};

const predictRate = (model, volume) => {
    const volumeTensor = tf.tensor2d([volume], [1, 1]);
    const prediction = model.predict(volumeTensor);
    return prediction.dataSync()[0];
};