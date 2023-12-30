import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"

const initialState = {
  totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
  total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

const cartSlice = createSlice({
  name:"cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item)=> item._id === course._id );

      //Course already added or not
      if(index >= 0){
        toast.error("Course is already in the cart");
        return;
      }

      //If not in the cart then add it
      state.cart.push(course);
      state.totalItems++;
      state.total += course.price;

      //Update to local storage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course added to the cart");
    },
    removeFromCart: (state, action) => {
      const courseID = action.payload;
      const index = state.cart.findIndex((item)=> item._id === courseID );

      //Check if course is there or not
      if(index >= 0 ){
        state.totalItems--;
        state.total -= state.cart[index].price;
        state.cart.splice(index, 1)

        // Update to localstorage
        localStorage.setItem("cart", JSON.stringify(state.cart))
        localStorage.setItem("total", JSON.stringify(state.total))
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems))

        // show toast
        toast.success("Course removed from cart")
      }
    },
    resetCart: (state) => {
      state.cart = []
      state.total = 0
      state.totalItems = 0
      // Update to localstorage
      localStorage.removeItem("cart")
      localStorage.removeItem("total")
      localStorage.removeItem("totalItems")
    }
  },
})
export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer; 