import {ProductInCart} from '../model/Product';
import {createContext} from 'react';
export interface Cart {
  listProduct: ProductInCart[];
  removeProductFromCart: (id: string) => void;
  addProductToCart: (product: ProductInCart) => void;
  clear: () => void;
}

const initialContext: Cart = {
  listProduct: [],
  removeProductFromCart: () => {
    throw new Error('Not implemented yet');
  },
  addProductToCart: () => {
    throw new Error('Not implemented yet');
  },
  clear: () => {
    throw new Error('Not implemented yet');
  },
};

export const CartContext = createContext(initialContext);
