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
import Game from './pages/Game';
import RequireAdmin from './Components/RequireAdmin';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/portfolio" element={
            <RequireAuth>
              <Portfolio />
            </RequireAuth>
          }/>
          <Route path="/admin" element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          } />

          
      </Routes>
      <Footer />
    </>
  );
}

export default App;
