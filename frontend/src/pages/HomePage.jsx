import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux";
import { assetThunk } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";
import Chart from "../Components/Chart";
import Chartjs from "../Components/Chartjs";

export default function HomePage() {
    return (
        <>
            <div className="portfolio d-flex w-100 font-color">
                <Chart stock="GOOGL" />
                <Chart stock="TSLA" />
            </div>
            {/* <Chartjs /> */}
        </>
    )
}