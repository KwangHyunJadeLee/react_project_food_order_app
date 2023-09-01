import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  // Those below function manage the state value about cart modal
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    // CartProvider is the Context that be used whole component in this app.
    // and indicate items in Cart.
    <CartProvider> 
      <Header onShowCart={showCartHandler} />
      <main>
        {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
