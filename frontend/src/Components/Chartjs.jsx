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
import formatData from "../utils/formatData";

export default function Chartjs({ stock }) {
  const [data, setData] = useState(null);
  const today = Math.floor(new Date().getTime() / 1000);
  const [name, setName] = useState("");

  useEffect(() => {
    if (stock) {
      getData(stock);
    }
  }, [stock]);

  const getData = async (stock) => {
    console.log("today", today);
    const res = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=D&from=1663090785&to=${today}&token=${process.env.REACT_APP_FINNHUB_API}`
    );
    const data = res.data;
    const formattedData = formatData(data);
    // const processData = {...data, date:data.t.map(item => format(new Date(item), 'yyyMMdd'))}
    // console.log("return", res.data)
    console.log("processed Data", formattedData);
    setData(formattedData);
  };

  return (
    <>
      {
        stock ? 
        <div>
            <div
            style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}
        >
            {`${stock}`}
        </div>
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
            <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4BC0C0" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#4BC0C0" stopOpacity={0.05} />
                </linearGradient>
            </defs>

            <Area dataKey="value" stroke="#4BC0C0" fill="url(#color)" />

            <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 7 === 0) {
                    return format(date, "MMM, d");
                }
                return "";
                }}
                //   tick={{fontSize: '10px', fill: '#fff'}}
            />

            <YAxis
                datakey="value"
                type="number"
                domain={["auto", "auto"]}
                axisLine={false}
                tickLine={false}
                tickCount={8}
                tickFormatter={(number) => `$${number.toFixed(2)}`}
                tick={{ fontSize: "10px", fill: "#fff" }}
            />

            <Tooltip content={<CustomTooltip />} />

            <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
        </ResponsiveContainer>
        </div>

        : null
        
      }
          </>
  );

  function CustomTooltip({ active, payload, label }) {
    if (active && payload) {
      return (
        <div>
          <p style={{ color: "white", fontSize: "1rem", fontWeight: "bold" }}>
            {format(new Date(label), "eeee, d MMM, yyyy")}
          </p>
          <p style={{ color: "white", fontSize: "1rem", fontWeight: "bold" }}>
            $ {payload[0].value.toFixed(2)} USD
          </p>
        </div>
      );
    }
    return null;
  }
}
