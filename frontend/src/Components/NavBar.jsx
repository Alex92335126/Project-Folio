import Web3Modal from 'web3modal'
import { providers } from 'ethers'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux'
import { Router, Link } from 'react-router-dom';
import { logout, logoutThunk } from '../redux/authSlice'


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
  useEffect(() => {
      // connect()
  }, [])
  const connect = async () => {
      console.log('clicked connect')
      const provider = await web3Modal.connect()
      console.log('connected', provider)

      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider)
      console.log('web3Provider', web3Provider)

      const signer = web3Provider.getSigner()
      console.log('signer', signer)
      const address = await signer.getAddress()
      setAddress(address)
      const walletAddress = address.substring(0, 4) + '...' + address.substring(address.length - 4, address.length)
      setWalletAddress(walletAddress)

      const network = await web3Provider.getNetwork()
  }

  const dispatch = useDispatch()
  let token = localStorage.getItem("TOKEN")
  console.log("token", token)
  
  
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
        className='d-flex nav-bar justify-content-end'
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <div className='cursor-pointer mx-2' onClick={()=> navigate ("/portfolio")}>Portfolio</div>
        </Nav.Item>
        <Nav.Item>
          {token?
            <div className='cursor-pointer mx-2' onClick={logout}>Logout</div> :
            <div className='cursor-pointer mx-2' onClick={()=> navigate ("/login")}>Login</div>}
        </Nav.Item>
        <Nav.Item>
            <div className='cursor-pointer mx-2' onClick={()=> navigate ("/signup")}>SignUp</div>
        </Nav.Item>
        <Nav.Item>
          <div className='cursor-pointer mx-2' onClick={()=> navigate("/buysell")}>Dashboard</div>
        </Nav.Item>
      </Nav>
    </div>
  );
}
