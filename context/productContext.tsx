import React, { createContext, useReducer } from "react";
import { Product } from "../app/types/Product";
const MAX_PRODUCTS = 5;

type State = {
  products: Product[];
};

type Action =
  | { type: "ADD_PRODUCT"; payload: Product };

const initialState: State = {
  products: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PRODUCT":
      if (state.products.length >= MAX_PRODUCTS) {
        return state;
      }
      return { products: [...state.products, action.payload] };
    default:
      return state;
  }
}

export const ProductContext = createContext<any>(null);

export const ProductProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
