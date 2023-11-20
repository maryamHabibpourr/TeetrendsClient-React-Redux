import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

const initialState = {
    loading: false,
    allProoducts: JSON.parse(localStorage.getItem('allProducts')) || [],
    error: "",
};



// const fetchAllProducts = createAsyncThunk("products/fetchProducts", async () => {
//     try {
//         const response = await axios.get("http://127.0.0.1:8000/store/products");
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         onsole.log(error.response)
//     }
// });





const fetchAllProducts = createAsyncThunk("products/fetchProducts", async (payload = {}) => {
    const { categoryId, ordering } = payload;
    let url = "https://api.teetrends.ir/store/products?";
    if (categoryId) url += `category=${categoryId}&`;
    if (ordering) url += `ordering=${ordering}`;
    
    try {
        const response = await axios.get(url);
        localStorage.setItem("allProducts", JSON.stringify(response.data))
        return response.data;
    } catch (error) {
        console.log(error.response);
    }
});





const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.allProoducts = action.payload;
            state.error = "";
        });
        builder.addCase(fetchAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.allProoducts = [];
            state.error = action.error.message;
        });
    },
});

export default productsSlice.reducer;
export { fetchAllProducts };



export const selectAllProoducts = (state) => state.products.allProoducts;
export const selectLoading = (state) => state.products.loading









