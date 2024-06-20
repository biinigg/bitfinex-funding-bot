import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const History = () => {
    const chartContainerRef = useRef();
    useEffect(() => {
        const chartOptions = {
            layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
                minutesVisible: false,
            },
        };
        const chart = createChart(chartContainerRef.current, chartOptions);
        const lineSeries = chart.addLineSeries({ color: '#2962FF' });
        lineSeries.setData([ {time: '2018-12-22 10:0:0', value: 75.16},
            {time: '2018-12-23 12:0:0', value: 45.12}])
        chart.timeScale().fitContent();
        return () => {
            chart.remove();
        };
    }, []);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default History;