import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);     // manage the amount value which is user's input with state hook.
  const amountInputRef = useRef();                              // Access input with the Ref hook.

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;         // When the form summitted, call the value what entered value in Ref.
    const enteredAmountNumber = +enteredAmount;                 // make sure to number

    // validation check. amount should be between 1 and 5.
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber); //none used context means only props used, because there is only amount data
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}          // two-way-biding. 
        label="Amount"
        input={{
          id: "amount_" + props.items.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a Valid amount (1-5).</p>} 
    </form>
  );
};

export default MealItemForm;
