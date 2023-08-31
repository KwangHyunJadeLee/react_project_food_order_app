import React from "react";
import styles from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}>Cart</HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        {" "}
        {/* if include '-', then that expression should be used */}
        <img src={mealsImage} alt="A table full of delicious food!"></img>
      </div>
    </React.Fragment>
  );
};

export default Header;
