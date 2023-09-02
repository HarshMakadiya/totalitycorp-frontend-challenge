import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]
};

const cartSlice = createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const { id } = action.payload;
            const existingItem = state.cart.findIndex(item => item.id === id);
            if(existingItem >= 0)
            {
                state.cart[existingItem].quantity++;
            }else{
                state.cart = ([...state.cart,{...action.payload, quantity:1}])
            }
        },
        removeFromCart:(state, action)=>{
            const data = state.cart.filter((ele)=>ele.id !== action.payload)
            state.cart = data;
        },
        removeSingleItem:(state, action)=>{
            const { id } = action.payload;
            const existingItem = state.cart.findIndex(item => item.id === id);
            if(state.cart[existingItem].quantity >= 1){
                state.cart[existingItem].quantity--;
            }
        },
        emptyCartItems:(state, action)=>{
            state.cart= [];
        }
    }
});

export const {addToCart, removeFromCart, removeSingleItem, emptyCartItems} = cartSlice.actions;

export default cartSlice.reducer;