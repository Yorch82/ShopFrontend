import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { useMemo } from 'react';
import Navbar from './scenes/global/Navbar';
import Footer from './scenes/global/Footer';
import Home from './scenes/home/Home';
import CartMenu from './scenes/global/CartMenu';
import ItemDetails from './scenes/itemDetails/ItemDetails';
import LoginPage from './scenes/loginPage/LoginPage';
import RegisterPage from './scenes/registerPage/RegisterPage';
import Profile from './scenes/profile/Profile';
import Orders from './scenes/orders/Orders';

function App() {
  const mode = useSelector(state => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth?.user?.token));

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>          
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="loginpage" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile/orders" element={isAuth ? <Orders /> : <Navigate to="/" />} />
            <Route path="profile" element={isAuth? <Profile /> : <Navigate to="/" />} />
            <Route path="product/:productId" element={<ItemDetails />} />
          </Routes>
          <CartMenu />
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
