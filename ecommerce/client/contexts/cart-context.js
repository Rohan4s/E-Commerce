import { createContext, useState } from "react";

const CartContext = createContext({
  increment: () => {},
  decrement: () => {},
  state: [],
});
export default CartContext;
const initialState = [
  {
    id: "64e06ac31cae0dbd91cab45a",
    quantity: 0,
  },
  {
    id: "64e10e295e137dc16a3f69d5",
    quantity: 0,
  },
  {
    id: "64e10f5c5e137dc16a3f69d6",
    quantity: 0,
  },
];
export function CartContextProvider({ children }) {
  const [state, setState] = useState(initialState);
  function incrementProduct(id) {
    console.log("inc");
    const updateState = state.map((e) => {
      if (id === e.id) {
        return {
          ...e,
          quantity: e.quantity + 1,
        };
      }

      return {
        ...e,
      };
    });
    setState(updateState);
  }
  function decrementProduct(id) {
    const updateState = state.map((e) => {
      if (id === e.id && e.quantity > 0) {
        return {
          ...e,
          quantity: e.quantity - 1,
        };
      } else {
        return {
          ...e,
        };
      }
    });
    setState(updateState);
  }
  return (
    <CartContext.Provider
      value={{
        incrementProduct,
        decrementProduct,
        state,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
