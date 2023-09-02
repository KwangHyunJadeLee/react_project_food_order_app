import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <React.Fragment>
      <MealsSummary />    {/*Info component about Meals Summary*/}
      <AvailableMeals />  {/*Data component for available Meals.*/}
    </React.Fragment>
  );
};

export default Meals;
