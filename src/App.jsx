import { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import NotFound from './components/NotFound/NotFound';
import { tokenContext } from './context/tokenContext';
import { ThemeContext } from './context/themeContext'; 
import { AuthView } from './components/AuthView/AuthView';
import { ProtectedRoutes } from './components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './components/CheckOut/CheckOut';
import WishList from './components/WishList/WishList';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';

function App() {
  let { setToken } = useContext(tokenContext);
  let { isDark } = useContext(ThemeContext);  

 
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, [setToken]);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes><WishList /></ProtectedRoutes> },
        { path: "productDetails/:id/:categoryId", element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
        { path: "login", element: <AuthView><Login /></AuthView> },
        { path: "allorders", element: <ProtectedRoutes><Order /></ProtectedRoutes> },
        { path: "register", element: <AuthView><Register /></AuthView> },
        { path: "cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" theme={isDark ? "dark" : "light"} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
