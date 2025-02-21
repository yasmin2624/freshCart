import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";

import TokenContextProvider from "./context/tokenContext.jsx";
import CounterContextProvider from "./context/counterContext.jsx";
import CartContextProvider from "./context/cartContext.jsx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WishlistProvider from "./context/wishListContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <WishlistProvider>
          <CounterContextProvider>
            <App />
          </CounterContextProvider>
        </WishlistProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
);
