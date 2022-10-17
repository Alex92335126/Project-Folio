import { useState, useEffect } from "react"
import axios from 'axios'



export default function AdminPage() {
    const [userList, setUserList] = useState([])

    useEffect(() => {
        getUserList()
        return () => {
        
        }
    }, [])

    const getUserList = async() => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND}/admin`)
        const data = res.data
        console.log('res data', data)
        setUserList(data)
    }
    

    return (
        <>
            <div className="portfolio w-100" style={{color: "orange"}}>
                <div style={{width: '75vw'}}>
                    <div className="d-flex">
                        <div className="col-md-2">
                            Username
                        </div>
                        <div className="col-md-2">
                            Score
                        </div>
                        <div className="col-md-2">
                            Wallet Address
                        </div>
                        <div className="col-md-2">
                            Issue NFT
                        </div>
                        <div className="col-md-2">
                            Reset Password
                        </div>
                        <div className="col-md-2">
                            Delete User
                        </div>
                    </div>
                    {userList ? userList.map((item, idx) => (
                        <div className="d-flex" key={idx}>
                            <div className="col-md-2">
                                {item.username}
                            </div>
                            <div className="col-md-2">
                                $ {Number(item.totalAsset).toFixed(2)}
                            </div>
                            <div className="col-md-2">
                                {item.walletAddress ? 
                                item.walletAddress.substring(0,5) + '...' + item.walletAddress.substring(item.walletAddress.length - 4,item.walletAddress.length)
                                :null}
                            </div>
                            <div className="col-md-2">
                                {item.username}
                            </div>
                            <div className="col-md-2">
                                {item.username}
                            </div>
                            <div className="col-md-2">
                                {item.username}
                            </div>
                        </div>    
                    )):null}
                </div>
            </div>
        </>
    )
}