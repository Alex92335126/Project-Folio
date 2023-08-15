import { useState, useEffect } from "react"
import axios from 'axios'
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';

const nftImage = [
    {
        id: 1,
        url: 'https://orvhir2b3twkgxs6ixt2x6jtbceehit2aj5om57xohkn67arnsna.arweave.net/dGp0R0Hc7KNeXkXnq_kzCIhDonoCeuZ393HU33wRbJo',
        title: 'First Place',
        tokenUrl: "https://jkjoyu4a2xx5ritx456bciaj7zkb543ajolz64u6bf5aay7gff7q.arweave.net/SpLsU4DV79iid-d8ESAJ_lQe82BLl59yngl6AGPmKX8"
    },
    {
        id: 2,
        url: 'https://vjvzop7s7k5oxvopneqobptjxqcwpd2x63guh37crc2j5fshmxfq.arweave.net/qmuXP_L6uuvVz2kg4L5pvAVnj1f2zUPv4oi0npZHZcs',
        title: 'Second Place',
        tokenUrl: "https://vyoiilkro2gjkfcmjvikoyktxnr5dazjdwvepf6vmn3ng4s7flfa.arweave.net/rhyELVF2jJUUTE1Qp2FTu2PRgykdqkeX1WN203JfKso"
    },
    {
        id: 3,
        url: 'https://rxp53oau23wmidjpb76uszhl57uo72ibjotpo3pzc635wdlafdcq.arweave.net/jd_duBTW7MQNLw_9SWTr7-jv6QFLpvdt-Re32w1gKMU',
        title: 'Third Place',
        tokenUrl: "https://qjccblrz22kya5lr6wag5pviqsf6fmvpqnqh4pwcy5rapomyh73q.arweave.net/gkQgrjnWlYB1cfWAbr6ohIvisq-DYH4-wsdiB7mYP_c"
    },
    {
        id: 4,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 5,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 6,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 7,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 8,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 9,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 10,
        url: 'https://vcqxfpvh4zd7x4wnqd4vw42ueq5uawgeslncudhczt5ofkmozrhq.arweave.net/qKFyvqfmR_vyzYD5W3NUJDtAWMSS2ioM4sz64qmOzE8',
        title: 'Consolation Prize',
        tokenUrl: "https://gdnx52ynjcxdiocja6mmvn7o5bvnmu2hwyjif7xk2fifw6gyipgq.arweave.net/MNt-6w1IrjQ4SQeYyrfu6GrWU0e2EoL-6tFQW3jYQ80"
    },
    {
        id: 11,
        url: 'https://yyc5nb46wlo7di4xbxoxbxeqhhv732yns6njelq5lm32t755pqya.arweave.net/xgXWh56y3fGjlw3dcNyQOev96w2XmpIuHVs3qf-9fDA',
        title: 'Consolation Prize',
        tokenUrl: "https://ynetmqzk5epak7tsaflkkupsjsjysbjjlssuesmpaxw66yu6w4zq.arweave.net/w0k2QyrpHgV-cgFWpVHyTJOJBSlcpUJJjwXt72KetzM"
    },
]

export default function AdminPage() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('TOKEN') : null
    const isAdmin = useSelector((state) => state.auth);
    console.log('isAdmin', isAdmin)
    const [userList, setUserList] = useState([])
    const [ethBalance, setEthBalance] = useState('')
    

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

    const handleNftClick = async(address, idx) => {
        console.log('clicked nft', address, idx +1)
        const nftItem = nftImage.find(item => item.id === idx+1)
        console.log(nftItem.tokenUrl)
        try {
            toast(`Mint in Progress! ⏳`);
            const res = await axios.post(`${process.env.REACT_APP_BACKEND}/eth/mint`, {
                address,
                uri: nftItem.tokenUrl
            })
            if(res) {
                toast(`Mint Success! 🚀`);
            }
        } catch (error) {
            toast(`Error ${error}`);
        }

    }

    const deleteUser = async(id) => {
        console.log('delete user', id)
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND}/user/del/${id}`,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
            if (res) {
                toast(`Delete Success!`);
                await getUserList()
            }
        } catch (error) {
            toast(`Error ${error}`);
        }
    }

    return (
        <>
            <ToastContainer
                    position="top-center"
                    autoClose={8000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
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
                                <div className="d-block">
                                    {
                                        nftImage ? nftImage.map((nftItem)=> (
                                            nftItem.id === idx+1 ? <img width={'65px'} src={nftItem.url} alt={nftItem.title}/>:null
                                        )): null
                                    }
                                </div>
                                {
                                    item.walletAddress ?
                                    <Button className="" onClick={() => handleNftClick(item.walletAddress, idx)} variant="success" size="sm">
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
                                <Button className="" onClick={() => deleteUser(item.userId)} variant="danger" size="sm">
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