import { useState } from "react"
import Chartjs from "./Chartjs"

export default function OnDemandChart() {
    const [symbol, setSymbol] = useState('')
    const [isReady, setIsReady] = useState(false)

    const handleChange = (e) => {
        setIsReady(false)
        const input = e.target.value
        setSymbol(input.toUpperCase())
    }

    const change = () => {
        setIsReady(true)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsReady(true)
        }
      }

    return (
        <>
            <label>
                Stock Symbol Lookup:
                <input
                    type="text" 
                    name="symbol"
                    value={symbol}
                    onChange={handleChange}
                    onBlur={change}
                    onKeyDown={handleKeyDown}
                />
            </label>
            {symbol && isReady ? <Chartjs stock={symbol} /> : null}
        </>
    )
}