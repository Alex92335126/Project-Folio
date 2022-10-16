import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { assetThunk, cashThunk, getTotalBal } from "../redux/portfolioSlice";
import { useDispatch, useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);


  
export default function PieChart() {
    const assetList = useSelector((state) => state.portFolioReducer);
    const cashBalance = useSelector((state) => state.portFolioReducer.cashBal);
    const [cashTotal, setCashTotal] = useState();

    const getCashTotal = () => {
    console.log("cash", cashBalance);
    let assetAmount = assetList.assetPortfolio
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next);
     setCashTotal(assetAmount + cashBalance);
};

const totalStockAmount = assetList.assetPortfolio.reduce((total, currentValue) => {
    console.log("current", currentValue);
 return total + Number(currentValue.amount)}, 0 )

console.log("stock", totalStockAmount)

const data = {
    legend: {
        display: "true",
        labels: {
            fontSize: 12,
            color: '#F59706'
        }
    },
    labels: ['stock', 'cash balance'],
    datasets: [
      {
        label: 'Asset Cash Distribution',
        data: [totalStockAmount, cashBalance 
        ],
        color: "#F59706",
        backgroundColor: [
          '#025CE6',
          '#E60202',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          '#F59706',
          '#F59706',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 3,
        
      },
    ],
  };

  const option = {
    legend: {
        display: "false",
        labels: {
            fontSize: 12,
            color: '#F59706'
        }
    }
  }

    return <Pie data={data} options={option} />;
  }
  
