import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);  // Here, Context be used for indicating number of cart Items.

  const { items } = cartCtx;

  // curNumber : from init data to result, item : data of index of array
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ""}`;

  // Add effect of Cart button. 
  useEffect(() => {
    // if there's no cart item, it not executed the effect
    if (cartCtx.items.length === 0) {
      return;
    }
    // managed by useState.
    setBtnIsHighlighted(true);

    // set TimeOut. 300ms, Because the effect css is setted to 300ms
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // return value always is Clean up function.
    // all side effect been used in useEffect should be tidy up in here.
    return () => {
      clearTimeout(timer);
    };
    // Dependency would include all features value which been used in useEffect.
  }, [items]);

  return (
    <button
      type={props.type || "button"}
      className={btnClasses}
      onClick={props.onClick}
    >
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
