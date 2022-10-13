import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'

export default function Chart({stock}) {
    const [stockChartXValue, setStockChartXValue] = useState([])
    const [stockChartYValue, setStockChartYValue] = useState([])
    const API_KEY = process.env.REACT_APP_ALPHA_API
    
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=compact&apikey=${API_KEY}`;
    
    useEffect(() => {
        getStock(url)
    }, [])
    
    const getStock = async(url) => {
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        const res = await axios.get(url)
        const data = res.data
        console.log("data", data)
        if(data) {
            for(let key in data['Time Series (Daily)']) {
                stockChartXValuesFunction.push(key);
                stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            }
        }
        setStockChartXValue(stockChartXValuesFunction)
        setStockChartYValue(stockChartYValuesFunction)
    }

    return (
        <div className="portfolio" style={{color: 'orange'}}>
            <Plot
              data={[
                {
                  x: stockChartXValue,
                  y: stockChartYValue,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {color: 'blue'},
                }
              ]}
              layout={
                {
                    plot_bgcolor:"black",
                    paper_bgcolor:"transparent",
                    title: `${stock} Chart`,
                }
            }
            />
        </div>
    )
}