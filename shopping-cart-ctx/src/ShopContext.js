import { createContext, useContext, useReducer } from "react";
import shopReducer, { initialState } from "./shopReducer";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const addToCart = (product) => {
    const updatedCart = state.products.concat(product);
    updatePrice(updatedCart);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        products: updatedCart,
      },
    });
  };
  const removeFromCart = (product) => {
    const updatedCart = state.products.filter((x) => x.name !== product.name);
    updatePrice(updatedCart);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        products: updatedCart,
      },
    });
  };
  const updatePrice = (products) => {
    let total = 0;
    products.forEach((x) => (total += x.price));

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        total,
      },
    });
  };

  const value ={
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart
  }
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

const useShop =()=>{
    const context= useContext(ShopContext);

    if(context === undefined){
       throw new Error("useShop must be used within ShopContext")
    }
    return context;
}
export default useShop;