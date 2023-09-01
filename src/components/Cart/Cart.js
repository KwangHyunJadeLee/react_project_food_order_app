import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);  // Here, Context be used for displaying all items in cart.

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // Display only up to two decimal places.
  const hasItems = cartCtx.items.length > 0;  // validation value for displaying the order button.

  const cartItemRemoveHandler = (id) => {     // Connect to Context function.
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });  // when the plus button is clicked, only one amount should be added.
  };

  const cartitems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (        // Every item in Cart Context mapping to CartItem Component.
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)} // The bind function is used to set the this value of a function and to pre-fix required parameters.
          onAdd={cartItemAddHandler.bind(null, item)}          // bind(thisArg, arg1, arg2, ...)
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onHideCart}>
      {cartitems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onHideCart}>
          close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
