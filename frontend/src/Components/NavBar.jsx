import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { useDispatch, useSelector } from 'react-redux'
import { logout, logoutThunk } from '../redux/authSlice'
import { getUserThunk } from "../redux/authSlice";
import axios from 'axios'


let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    // network: 'mainnet', // optional
    cacheProvider: true,
    // providerOptions, // required
  })
}

export default function NavBar() {
  // const { theme, setTheme } = useTheme()
  const [address, setAddress] = useState('')
  const [walletAddress, setWalletAddress] = useState('')
  let navigate = useNavigate()
  let token = localStorage.getItem("TOKEN")
  const role = localStorage.getItem("ROLE")
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const connect = async () => {
      console.log('clicked connect')
      try {
        const provider = await web3Modal.connect()
        const web3Provider = new providers.Web3Provider(provider)
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
        const walletAddress = address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length)
        setWalletAddress(walletAddress)
        await axios.post(
          `${process.env.REACT_APP_BACKEND}/user/update-address`, {walletAddress: address} ,{
            headers: {
              Authorization: `Bearer ${token}`,
        }})
        dispatch(getUserThunk())
        

        const network = await web3Provider.getNetwork()
      } catch (error) {
        console.log(error)
        
      }
  }
  
  useEffect(() => {
    if (user.walletAddress) {
      const address = user.walletAddress
      const walletAddress = address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length)
      setWalletAddress(walletAddress)
    } else {
      setWalletAddress('')
    }
    console.log("nav render")
  }, [token, user])

  const logout = async () => {
    await dispatch(logoutThunk())
    navigate('/')
  }

  return (
    <div className='navigation-bar-header'> 
      <Nav
        className='d-flex nav-bar justify-content-between w-100'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div>
          <Nav.Item>
            <div className='cursor-pointer mx-3' onClick={()=> navigate ("/portfolio")}><img src="/gamelogo.png" height={"60px"} width={"400px"}/></div>
          </Nav.Item>
        </div>
        <div className='d-flex'>
        {
          role === "1" ?
          <div className='d-flex'>
            <Nav.Item>
              <div className='cursor-pointer1 mx-3' onClick={()=> navigate ("/admin")}>Admin</div>
            </Nav.Item> 
            <Nav.Item>
              <div className='cursor-pointer1 mx-3' onClick={logout}>Logout</div>
            </Nav.Item> 
          </div>
          :
           <div className='d-flex'>
            <Nav.Item>
          <div className='cursor-pointer1 mx-3' onClick={()=> navigate ("/game")}>Game</div>
        </Nav.Item>
        <Nav.Item>
          <div className='cursor-pointer1 mx-3' onClick={()=> navigate ("/portfolio")}>Portfolio</div>
        </Nav.Item>
        <Nav.Item>
          <div className='cursor-pointer1 mx-3' onClick={()=> navigate("/")}>Dashboard</div>
        </Nav.Item>
        <Nav.Item>
          {token?
            <div className='cursor-pointer1 mx-3' onClick={logout}>Logout</div> :
            <div className='cursor-pointer1 mx-3' onClick={()=> navigate ("/login")}>Login</div>}
        </Nav.Item>
        {
          token ? null :
          <Nav.Item>
            <div className='cursor-pointer1 mx-3' onClick={()=> navigate ("/signup")}>SignUp</div>
          </Nav.Item>
        }
       { 
          token ? <Nav.Item className='d-flex align-items-center'>
              {
                walletAddress ? 
                <div>{walletAddress}</div> :
                <div className='cursor-pointer mx-3' onClick={connect}>Connect</div>
              }
              
          </Nav.Item> : null
        }
           </div>
          
        }
          
        </div>
      </Nav>
    </div>
  );
}
