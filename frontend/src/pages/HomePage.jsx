import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useDispatch } from "react-redux";
import { assetThunk } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <div>
                Home page
            </div>
        </>
    )
}