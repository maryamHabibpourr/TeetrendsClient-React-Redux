import React from "react";
import styles from "./PriceFactore.module.scss"

function PriceFactore({
  totalQuantity,
  totalPriceCalculate,
  cartItems,
}) {
  return (
    <div className={styles.containerPrice}>
      <h1>فاکتور خرید شما:</h1>
      <h2>تعداد اقلام خریداری شده: <span>{cartItems}</span></h2>
      <h2>تعداد کل از اقلام خریده شده: <span>{totalQuantity}</span></h2>
      <h2>قیمت کل: <span>{totalPriceCalculate}</span>تومان</h2>
    </div>
  );
}

export default PriceFactore;
