import React, { useState, useEffect } from 'react';
import { loadData } from './data';
import { trainModel, predictRate } from './model';

const Predict = () => {
  const [model, setModel] = useState(null);
  const [volume, setVolume] = useState('');
  const [predictedRate, setPredictedRate] = useState(null);

  useEffect(() => {
    const fetchDataAndTrainModel = async () => {
      const data = await loadData();
      const trainedModel = await trainModel(data);
      setModel(trainedModel);
    };
    fetchDataAndTrainModel();
  }, []);

  const handlePredict = () => {
    if (model && volume) {
      const rate = predictRate(model, parseFloat(volume));
      if (rate !== null || rate !== undefined) {

        console.log("predict:" + rate);
        setPredictedRate(rate);
      }
    }
  };

  return (
    <div>
      <h1>利率預測模型</h1>
      <input
        type="number"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        placeholder="輸入交易量"
      />
      <button onClick={handlePredict}>預測</button>
      {predictedRate !== null && (
        <p>預測的利率: {predictedRate.toFixed(2)}</p>
      )}
    </div>
  );
};

export default Predict;
