import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import LocomotiveScroll from 'locomotive-scroll';
import CursorPointer from './CursorPointer';
function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isAboveTablet, setIsAboveTablet] = useState(false);
  const locomotiveScrollRef = useRef(null); // Ref for LocomotiveScroll instance

  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.curret_user.url,{
      method: SummaryApi.curret_user.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    // user details
    fetchUserDetails()
    // user add to cart
    fetchUserAddToCart()
  }, [])

  useEffect(() => {
    const handleMouseMovement = (e) => {
      setX(e.clientX);
      setY(e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMovement);

    return () => {
      document.removeEventListener('mousemove', handleMouseMovement);
    };
  }, [x,y]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsAboveTablet(true);
        if (!locomotiveScrollRef.current) {
          locomotiveScrollRef.current = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
          });
        }
      } else {
        setIsAboveTablet(false);
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.destroy();
          locomotiveScrollRef.current = null;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
  <>
  <Context.Provider value={{
    fetchUserDetails, // user detail fetch
    cartProductCount,
    fetchUserAddToCart
  }}>
    <ToastContainer
      position='top-left'
    />
    <Header/>
    <main className='min-h-[calc(100vh-120px)] bg-[#F2EAD3] pt-16' data-scroll-container>
      <Outlet/>
    </main>
    <Footer/>
    {isAboveTablet && <CursorPointer x={x} y={y} />}
    </Context.Provider>
  </>
  );
}

export default App;