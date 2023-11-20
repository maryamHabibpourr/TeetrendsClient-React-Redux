import React, { useState, useEffect } from "react";
import Axios from "axios";

//helper
import { shortenText } from "../../../components/config/helpers";
import { Link } from "react-router-dom";

//assets
import trash from "../../../assets/trash.svg";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  CATCHIDCART,
  CATCHCARTITEMS,
  INCREMENTCARTITEM,
  DECREMENTCARTITEM,
  DELETECARTITEM,
} from "../../../redux/slice/cartSlice";
import { selectIdCart, selectCartItems } from "../../../redux/slice/cartSlice";

//styles
import styles from "./ProductItems.module.scss";

//persian tools
import { digitsEnToFa, addCommas } from "@persian-tools/persian-tools";

function ProductItem({ product }) {
  const dispatch = useDispatch();
  const idCart = useSelector(selectIdCart);
  const cartItems = useSelector(selectCartItems);
  const [isCreatingCart, setIsCreatingCart] = useState(false);
  console.log(idCart);
  console.log("cartItems", cartItems);

  const createCart = async () => {
    setIsCreatingCart(true);
    try {
      const response = await Axios.post(
        "https://api.teetrends.ir/store/carts/"
      );
      dispatch(CATCHIDCART(response.data.id));
      localStorage.setItem("theCartId", response.data.id.toString());
      setIsCreatingCart(false);
      return response.data.id;
    } catch (error) {
      setIsCreatingCart(false);
      console.error("Failed to create cart:", error);
      return null;
    }
  };

  const handleAddItemToCart = async (cartId) => {
    const baseUrl = "https://api.teetrends.ir/store/carts/";
    const addItemUrl = `${baseUrl}${cartId}/items/`;
    const currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProductIndex = currentItems.findIndex(
      (item) => item.product === product.id
    );

    try {
      if (existingProductIndex !== -1) {
        currentItems[existingProductIndex].quantity += 1;
        const updateItemUrl = `${baseUrl}${cartId}/items/${currentItems[existingProductIndex].id}/`;
        await Axios.patch(updateItemUrl, {
          quantity: currentItems[existingProductIndex].quantity,
        });

        dispatch(INCREMENTCARTITEM(currentItems[existingProductIndex]));
      } else {
        const response = await Axios.post(addItemUrl, {
          product: product.id,
          quantity: 1,
        });
        currentItems.push(response.data);
        dispatch(CATCHCARTITEMS(response.data));
      }

      localStorage.setItem("cartItems", JSON.stringify(currentItems));
    } catch (error) {
      console.error("Failed to add or update item in the cart:", error);
    }
  };

  const handleCartClick = async () => {
    let currentCartId = idCart || localStorage.getItem("theCartId");

    if (!currentCartId && !isCreatingCart) {
      currentCartId = await createCart();
    }

    if (currentCartId) {
      handleAddItemToCart(currentCartId);
    }
  };

  const handleDeleteItemFromCart = async (cartId) => {
    console.log("Deleting item from cart");
    const baseUrl = "https://api.teetrends.ir/store/carts/";
    const currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProductIndex = currentItems.findIndex(
      (item) => item.product === product.id
    );
    if (existingProductIndex !== -1) {
      await Axios.delete(
        `${baseUrl}${cartId}/items/${currentItems[existingProductIndex].id}/`
      );
      dispatch(DELETECARTITEM(currentItems[existingProductIndex]));
      currentItems.splice(existingProductIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(currentItems));
    }
  };

  const handleDecrementItemInCart = async (cartId) => {
    console.log("Decrementing item quantity in cart");
    const baseUrl = "https://api.teetrends.ir/store/carts/";
    const currentItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProductIndex = currentItems.findIndex(
      (item) => item.product === product.id
    );
    if (existingProductIndex !== -1) {
      currentItems[existingProductIndex].quantity -= 1;
      await Axios.patch(
        `${baseUrl}${cartId}/items/${currentItems[existingProductIndex].id}/`,
        {
          quantity: currentItems[existingProductIndex].quantity,
        }
      );
      dispatch(DECREMENTCARTITEM(currentItems[existingProductIndex]));
      if (currentItems[existingProductIndex].quantity <= 0) {
        currentItems.splice(existingProductIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(currentItems));
    }
  };

  const getProductQuantity = (productId) => {
    const item = cartItems.find((item) => item.product === productId);
    return item ? item.quantity : 0;
  };

  const productQuantity = getProductQuantity(product.id);

  return (
    <div className={styles.container}>
      <div className={styles.cardImage}>
        <img src={product.image} alt="product" />
      </div>
      <h3>{shortenText(product.name, 20)}</h3>
      <div className={styles.priceInfo}>
        <span>تومان</span>
        <p>{`${digitsEnToFa(addCommas(product.unit_price))}`}</p>
      </div>
      <div className={styles.linkContainer}>
        <Link to={`/products/${product.id}`}>جزئیات</Link>

        <div className={styles.buttonContainer}>
          {productQuantity === 0 && (
            <button onClick={handleCartClick}>افزودن به سبد خرید</button>
          )}

          {productQuantity > 0 && (
            <div className={styles.smallButtonContainer}>
              {productQuantity > 1 ? (
                <button
                  className={styles.smallButton}
                  onClick={() => handleDecrementItemInCart(idCart)}
                >
                  -
                </button>
              ) : (
                <button
                  className={styles.smallButton}
                  onClick={() => handleDeleteItemFromCart(idCart)}
                >
                  <img src={trash} alt="trash" />
                </button>
              )}

              <span className={styles.counter}>
                {digitsEnToFa(getProductQuantity(product.id))}
              </span>

              <button className={styles.smallButton} onClick={handleCartClick}>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
