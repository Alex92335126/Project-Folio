import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

export default function Chartjs({stock}) {
    const [xData, setXData] = useState(null)
    const [yData, setYData] = useState(null)
    const [data, setData] = useState(null)
    const today = Math.floor(new Date().getTime() / 1000)
    
    useEffect(() => {
        getData("F")
    }, [])

    function CustomTooltip({ active, payload, label }) {
        if (active) {
          return (
            <div className="tooltip">
              <p className="text-xs text-white">{format(new Date(label), "eeee, d MMM, yyyy")}</p>
              <p className="text-xs text-white">$ {payload[0].value.toFixed(2)} USD</p>
            </div>
          );
        }
        return null;
      }

    const getData = async (stock) => {
        console.log("today", today)
        const res = await axios.get(`https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=1663090785&to=${today}&token=${process.env.REACT_APP_FINNHUB_API}`)
        const data = res.data
        console.log("return", data)
        // const processData = {...data, date:data.t.map(item => format(new Date(item), 'yyyMMdd'))}
        // console.log("return", res.data)
        // console.log('processed Data', processData)
        setData(data)
    }

    return(
        <>
        <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#4BC0C0"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="75%"
                          stopColor="#4BC0C0"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>

                    <Area dataKey="value" stroke="#4BC0C0" fill="url(#color)" />

                    <XAxis
                      dataKey="t"
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(str) => {
                        const date = parseISO(str);
                        if (date.getDate() % 7 === 0) {
                          return format(date, "MMM, d");
                        }
                        return "";
                      }}
                    />

                    <YAxis
                      datakey="c"
                      axisLine={false}
                      tickLine={false}
                      tickCount={8}
                      tickFormatter={(number) => `$${number.toFixed(2)}`}
                      tick={{fontSize: '10px', fill: '#fff'}}
                    />

                    {/* <Tooltip content={<CustomTooltip />} /> */}

                    <CartesianGrid opacity={0.1} vertical={false} />
                  </AreaChart>
                </ResponsiveContainer>
        </>
    )

}

