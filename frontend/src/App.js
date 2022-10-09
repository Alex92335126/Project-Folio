import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import BuySell from './Components/BuySell';
import NavBar from './Components/NavBar';
import Portfolio from './pages/Portfolio';
import RequireAuth from './Components/RequireAuth';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/buysell" element={<BuySell />}></Route>
          <Route path="/portfolio" 
            element={
            <RequireAuth>
              <Portfolio />
            </RequireAuth>
          }/>
      </Routes>
    </>
  );
}

export default App;
