import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import LocomotiveScroll from 'locomotive-scroll';
import CursorPointer from './Cursor';

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);


  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.curret_user.url, {
      method: SummaryApi.curret_user.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include',
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  useEffect(() => {
    const handleMouseMovement = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMovement);

    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
    };
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,
          cartProductCount,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position='top-left' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] bg-[#F2EAD3] pt-16 relative'>
          <Outlet />
        </main>
        <Footer />
        <CursorPointer x={x} y={y} />
      </Context.Provider>
    </>
  );
}

export default App;
