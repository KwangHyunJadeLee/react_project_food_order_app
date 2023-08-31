import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import styles from "./MealItem.module.css";
import CartContext from "../../../store/cart-context";

const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm items={props} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
