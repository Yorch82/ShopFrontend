import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Profile from './scenes/profile/Profile';

function App() {
  const mode = useSelector(state => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>          
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/loginpage" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
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
