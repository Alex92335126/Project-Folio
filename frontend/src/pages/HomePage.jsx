import { useEffect, useState } from "react";
import Chartjs from "../Components/Chartjs";
import OnDemandChart from "../Components/OnDemandChart";
import axios from 'axios'
import { format } from 'date-fns'

export default function HomePage() {
    const [news, setNews] = useState([])
    useEffect(() => {
        getNews()
    }, [])

    const getNews = async() => {
        const res = await axios.get(`https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINNHUB_API}`)
        const data = await res.data
        console.log("news", typeof res.data, res)
        setNews(res.data)
    }


    return (
        <div className="portfolio font-color" style={{color: "orange"}}>
            <h1>
                GameFolio
            </h1>
            <div className="d-flex w-100 font-color">
                <div className="col-md-4">
                    <Chartjs stock="AAPL" />
                </div>
                <div className="col-md-4">
                    <Chartjs stock="GOOGL" />
                </div>
                <div className="col-md-4">
                    <Chartjs stock="TSLA" />
                </div>
            </div>
            <div className="d-flex">
                <div className="col-md-6 px-1">
                    <OnDemandChart />
                </div>
                <div className="col-md-6 px-2" style={{overflowY: "scroll", height: "50vh"}}>
                    {news ? news.map((item) => (
                        <div className="py-2" key={item.id}>
                            {/* {item.datetime} */}
                            {format(new Date(item.datetime * 1000), "d MMM yyyy")}
                            <div>
                                <div className="d-flex">
                                <h5>{item.headline} - {item.source}</h5>
                                <a href={item.url} target="_blank">
                                    <img width={180} src={item.image} />
                                </a>
                                </div>
                                    <div>
                                        {item.summary}
                                    </div>
                            </div>
                        </div>
                    )): 
                    null
                    }
                </div>
            </div>
        </div>
    )
}