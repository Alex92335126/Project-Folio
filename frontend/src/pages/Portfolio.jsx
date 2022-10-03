import { useState } from "react"
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux";
import { assetThunk } from "../redux/portfolioSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Portfolio() {

    const dispatch = useDispatch()
    const assetList = useSelector((state) => state.portFolioReducer.assetPortfolio)

    useEffect(() => {
        dispatch(assetThunk())
    }, [])

    return (
        <>
            <div>
                hi from portfolio
            </div>
        </>
    )
}