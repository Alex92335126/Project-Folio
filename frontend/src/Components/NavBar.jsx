import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { Router, Link } from 'react-router-dom';
import { logout, logoutThunk } from '../redux/authSlice'


// function Header() {
//   // Import result is the URL of your image
//   return <img src={logo} alt="Logo" />;
// }

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

  // useEffect(() => {
  //     // connect()
  // }, [])
  const connect = async () => {
      console.log('clicked connect')
      try {
        const provider = await web3Modal.connect()
        console.log('connected', provider)
        const web3Provider = new providers.Web3Provider(provider)
        console.log('web3Provider', web3Provider)
  
        const signer = web3Provider.getSigner()
        console.log('signer', signer)
        const address = await signer.getAddress()
        setAddress(address)
        const walletAddress = address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length)
        setWalletAddress(walletAddress)
  
        const network = await web3Provider.getNetwork()
      } catch (error) {
        console.log(error)
        
      }
  }

  const dispatch = useDispatch()
  
  
  
  useEffect(() => {
    console.log("nav render")
  }, [token])

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
        <Nav.Item className='d-flex align-items-center'>
            {
              walletAddress ? 
              <div>{walletAddress}</div> :
              <div className='cursor-pointer mx-3' onClick={connect}>Connect</div>
            }
            
        </Nav.Item>
           </div>
          
        }
          
        </div>
      </Nav>
    </div>
  );
}
