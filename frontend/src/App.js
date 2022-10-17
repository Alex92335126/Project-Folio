import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup';
import HomePage from './pages/HomePage';
import NavBar from './Components/NavBar';
import Portfolio from './pages/Portfolio';
import RequireAuth from './Components/RequireAuth';
import PieChart from './Components/PieChart';
import Footer from './Components/Footer';
import AdminPage from './pages/AdminPage';
import Scoreboard from './pages/Scoreboard';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/scoreboard" element={<Scoreboard />}></Route>
          <Route path="/portfolio" 
            element={
            <RequireAuth>
              <Portfolio />
            </RequireAuth>
          }/>
          <Route path="/admin" element={<AdminPage />} />

          
      </Routes>
      <Footer />
    </>
  );
}

export default App;
