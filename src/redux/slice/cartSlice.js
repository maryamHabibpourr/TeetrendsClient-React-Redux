import { createSlice } from '@reduxjs/toolkit';


let cartItems = [];
try {
  cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
} catch (e) {
  console.error('Error parsing cart items from local storage', e);
}



const initialState = {
    idCart: localStorage.getItem('theCartId') || null,
    cartItems: cartItems,
    total_price: localStorage.getItem('totalPrice') || null
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        CATCHIDCART: (state, action) => {
            state.idCart = action.payload
            console.log("Updated cart ID: ", action.payload);
        },
        CATCHCARTITEMS: (state, action) => {
            state.cartItems.push(action.payload);
            console.log("Added new item to cart: ", action.payload);
        },
     
        INCREMENTCARTITEM: (state, action) => {
            const existingProductIndex = state.cartItems.findIndex(item => item.product === action.payload.product);
            if (existingProductIndex !== -1) {
                state.cartItems[existingProductIndex].quantity += 1;
            }
            console.log("Incremented quantity for product:", action.payload.product);
        },
        DECREMENTCARTITEM: (state, action) => {
            const existingProductIndex = state.cartItems.findIndex(item => item.product === action.payload.product);
            if (existingProductIndex !== -1) {
                state.cartItems[existingProductIndex].quantity -= 1;
                if (state.cartItems[existingProductIndex].quantity === 0) {
                    state.cartItems.splice(existingProductIndex, 1);
                }
            }
            console.log("Decremented quantity for product:", action.payload.product);
        },
        DELETECARTITEM: (state, action) => {
            const existingProductIndex = state.cartItems.findIndex(item => item.product === action.payload.product);
            if (existingProductIndex !== -1) {
                state.cartItems.splice(existingProductIndex, 1);
            }
            console.log("Deleted product from cart:", action.payload.product);
        },
        
        CATCHCARTTOTALPRICE: (state, action) => {
            state.total_price = action.payload
            console.log("Updated cart total price: ", action.payload);
        },
        CLEARECART :(state) => {
            state.cartItems = []
        }
    }
});



export const {
    CATCHIDCART,
    CATCHCARTITEMS,
    CATCHCARTTOTALPRICE,
    INCREMENTCARTITEM,
    DECREMENTCARTITEM,
    DELETECARTITEM,
    CLEARECART
} = cartSlice.actions;


export const selectIdCart = (state) => state.cart.idCart;
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotal_price = (state) => state.cart.total_price

export default cartSlice.reducer;





