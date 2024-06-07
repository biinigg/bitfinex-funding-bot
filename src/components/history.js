import React, {useEffect, useState, useCallback} from 'react';
import {createChart} from 'lightweight-charts';
import GetHist from '../v1/api'


const History = () => {
        const [area, setArea] = useState([
            {time: '2018-12-22 10:0:0', value: 75.16},
            {time: '2018-12-23 12:0:0', value: 45.12}
        ]);
        const [candle, setCandle] = useState([
            {time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72},
            {time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09},
            {time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29},
            {time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50},
            {time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04},
            {time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40},
            {time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25},
            {time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43},
            {time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10},
            {time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26},
        ]);
        let areaSeries = {};
        let candlestickSeries = {};
        // const chart = async ()=> await initializeChart(area, candle);
        // function fetchData(chart) {
        //     const hist =  GetHist().then(
        //         data=>{
        //             if (data !== null) {
        //                 console.log(data.USD)
        //                 const newAreaData = data.USD.results;
        //                 console.log("c"+newAreaData)
        //                 setArea(newAreaData)
        //                 // areaSeries.update(newAreaData)
        //                 chart.timeScale().fitContent();
        //                 chart.timeScale().scrollToPosition(5);
        //             }
        //         }
        //     );
        // const newCandleData=[...candle, {time: `2019-01-01`, open: 28, high: 29, low: 10, close: 20}]
        // setCandle(newCandleData)
        // candlestickSeries.update(newCandleData)

        const updateChartData = useCallback(async () => {
            return await GetHist().then(res => {


                const chartOptions = {
                    layout: {
                        textColor: 'white',
                        background: {type: 'solid', color: 'black'},
                    },
                };
                const chart = createChart(document.getElementById('chart'), chartOptions);

                let areaSeries = chart.addAreaSeries({
                    lineColor: '#2962FF',
                    topColor: '#2962FF',
                    bottomColor: 'rgba(41, 98, 255, 0.28)',
                });
                // setArea(res.USD.results)
                console.log(res.USD.results)
                areaSeries.setData(res.USD.results)
                chart.timeScale().fitContent();
                // areaSeries.setData(area);
                // chart.timeScale().fitContent();
                return chart;

            })
        }, []);

// update data every 1 minutes, used useEffect
        useEffect(() => {

            let chart = updateChartData();
            // const interval = setInterval(() => {
            //     chart = updateChartData(); // 每十秒调用一次
            // }, 10000);

            return () => {
                // clearInterval(interval);
                chart.remove();
            }
        }, [area,updateChartData]);

        return (
            <div id="chart" style={{height: '500px'}}></div>
        );
    }
;

export default History;
