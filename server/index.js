const express = require("express");
const cors = require("cors");
const NodeCache = require("node-cache");

const bitfinext = require("./bitfinex");
const { compoundInterest, getLowRate } = require("./utils");
const scheduler = require("./scheduler");
const db = require("./db");

const app = express();
const port = 3001;
const cache = new NodeCache();

app.use(cors());

app.get("/api/data", async (req, res) => {
  const getDataByCurrency = async ccy => {
    const balance = await bitfinext.getBalance(ccy);
    const availableBalance = await bitfinext.getAvailableBalance(ccy);
    const lending = (await bitfinext.getCurrentLending(ccy)).map(l => ({
      amount: l.amount,
      period: l.period,
      rate: compoundInterest(l.rate).toFixed(4),
      exp: l.time + l.period * 86400000
    }));

    const rate = compoundInterest(await getLowRate(ccy)).toFixed(4);

    // take only recently 30 days
    const day30diff = 30 * 24 * 3600 * 1000;
    const day30ago = Date.now() - day30diff;
    const earnings = await db.earnings
      .find({
        mts: { $gt: day30ago },
        currency: ccy
      })
      .sort({ _id: -1 });
    const frrRates = await bitfinext.getFrrRateList(ccy);

    return { ccy, balance, availableBalance, lending, earnings, rate, frrRates };
  };

  let data = cache.get("data");
  if (data) {
    return res.status(200).json(data);
  }

  const usdData = await getDataByCurrency("USD");
  const ustData = await getDataByCurrency("UST");
  data = [usdData, ustData];

  cache.set("data", data, 10);
  return res.status(200).json(data);
});

const formatTimestamp=(ts)=> {
  const date = new Date(ts);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
const calculateValue = (value) => value * 365 * 100 * 365;
app.get("/api/frrs", async (req, res) => {
  const getDataByCurrency = async ccy => {
    const frrRates = await bitfinext.getFrrRateList(ccy);
    const results = [];
    frrRates.forEach((item, index) => {
          if (item !== null) {
            results.push({
              'time': formatTimestamp(item[0]),
              'value': calculateValue(item[3])
            });
          }
        });
    return { ccy, results };
  };

  let data = cache.get("frrs");
  if (data) {
    return res.status(200).json(data);
  }

  const usdData = await getDataByCurrency("USD");
  const ustData = await getDataByCurrency("UST");
  data = [usdData, ustData];

  cache.set("frrs", data, 30*60);
  return res.status(200).json(data);
});

app.get("/api/frr/hist", async (req, res) => {
  const getDataByCurrency = async ccy => {
    const frrRates = await bitfinext.getFrrRateList(ccy);
    const rates = [];
    const volumes = [];
    const datetimes = [];
    frrRates.forEach((item, index) => {
          if (item !== null) {
            rates.push(calculateValue(item[3]));
            datetimes.push(formatTimestamp(item[0]));
            volumes.push(item[8]);
          }
        });
    const results = {rates, volumes, datetimes};
    return { ccy, results };
  };

  let data = cache.get("frrhist");
  if (data) {
    return res.status(200).json(data);
  }

  const usdData = await getDataByCurrency("USD");
  const ustData = await getDataByCurrency("UST");
  data = [usdData, ustData];

  cache.set("frrhist", data, 30*60);
  return res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`bitfinex lending bot api on port ${port}!`);
  scheduler();
});
