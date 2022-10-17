import { useState, useEffect } from "react"
import axios from 'axios'
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";


export default function AdminPage() {
    const isAdmin = useSelector((state) => state.auth);
    console.log('isAdmin', isAdmin)
    const [userList, setUserList] = useState([])
    const [ethBalance, setEthBalance] = useState('')
    const nftImage = [
        {
            id: 1,
            url: 'https://orvhir2b3twkgxs6ixt2x6jtbceehit2aj5om57xohkn67arnsna.arweave.net/dGp0R0Hc7KNeXkXnq_kzCIhDonoCeuZ393HU33wRbJo',
            title: 'First Place',
        },
        {
            id: 2,
            url: 'https://vjvzop7s7k5oxvopneqobptjxqcwpd2x63guh37crc2j5fshmxfq.arweave.net/qmuXP_L6uuvVz2kg4L5pvAVnj1f2zUPv4oi0npZHZcs',
            title: 'Second Place',
        },
        {
            id: 3,
            url: 'https://rxp53oau23wmidjpb76uszhl57uo72ibjotpo3pzc635wdlafdcq.arweave.net/jd_duBTW7MQNLw_9SWTr7-jv6QFLpvdt-Re32w1gKMU',
            title: 'Third Place',
        },
        {
            id: 4,
            url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
            title: 'Consolation Prize',
        },
    ]

    useEffect(() => {
        getUserList()
        getEthBal()
        return () => {
        
        }
    }, [])

    const getUserList = async() => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND}/admin`)
        const data = res.data
        console.log('res data', data)
        setUserList(data)
    }

    const getEthBal = async() => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND}/eth/get-bal`)
        const data = res.data
        console.log('res data', data)
        setEthBalance(data)
    }

    const showNftImg = (idx) => {
        const image = nftImage.find(item => item.id === idx +1)
        console.log(image)
        return (
            <img className="px-1" width="65px" alt={image.title} src={image.url} />
        )
    }
    

    return (
        <>
            <div className="portfolio w-100 px-2" style={{color: "orange"}}>
                <div className="d-flex align-items-center py-4">
                    <h4 className="col-md-8">
                        Users Scoreboard
                    </h4>
                    <div className="col-md-4" style={{textAlign: 'end'}}>
                        Eth Balance: {Number(ethBalance).toFixed(5)}
                    </div>
                </div>
                <div className="" style={{width: '100vw', textAlign: 'center'}}>
                    <div className="d-flex" style={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                        <div className="col-md-1">
                            Ranking
                        </div>
                        <div className="col-md-2">
                            Username
                        </div>
                        <div className="col-md-2">
                            Score
                        </div>
                        <div className="col-md-2">
                            Wallet Address
                        </div>
                        {/* <div className="col-md-2">
                            Issue NFT
                        </div>
                        <div className="col-md-2">
                            Reset Password
                        </div>
                        <div className="col-md-2">
                            Delete User
                        </div> */}
                    </div>
                    {userList ? userList.map((item, idx) => (
                        <div className="d-flex" key={idx}>
                            <div className="col-md-1">
                                {idx + 1}
                            </div>
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
                            <div className="col-md-2 my-1 d-flex">
                                {showNftImg(idx)}
                                {
                                    item.walletAddress ?
                                    <Button className=""  variant="success" size="sm">
                                        Issue NFT
                                    </Button>: <div>No Wallet to issue</div>
                                }
                                
                            </div>
                            <div className="col-md-2 my-1">
                                <Button className=""  variant="warning" size="sm">
                                    Reset Password 
                                </Button>
                            </div>
                            <div className="col-md-1 my-1">
                                <Button className=""  variant="danger" size="sm">
                                    Delete
                                </Button>
                            </div>
                        </div>    
                    )):null}
                </div>
            </div>
        </>
    )
}