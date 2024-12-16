import React from 'react';
import {useState} from 'react';
import {ProductInCart} from '../model/Product';
import {CartContext} from './CartContext';

interface CartContextProviderProps {
  children: React.ReactNode;
}

export const CartContextProvider = (props: CartContextProviderProps) => {
  const [listProductInCart, setListProductInCart] = useState<ProductInCart[]>(
    [],
  );
  const removeProductFromCart = (id: string) => {
    setListProductInCart(listProductInCart.filter(prd => prd.id !== id));
  };

  const addProductToCart = (product: ProductInCart) => {
    const index = listProductInCart.findIndex(
      prd =>
        prd.id === product.id &&
        prd.selectedVariation === product.selectedVariation,
    );
    if (index !== -1) {
      const newProduct = {
        ...listProductInCart[index],
        quantity: listProductInCart[index].quantity + product.quantity,
      };
      setListProductInCart([
        ...listProductInCart.slice(0, index),
        newProduct,
        ...listProductInCart.slice(index + 1),
      ]);
    } else {
      setListProductInCart([...listProductInCart, product]);
    }
  };

  const clear = () => {
    setListProductInCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        listProduct: listProductInCart,
        removeProductFromCart,
        addProductToCart,
        clear,
      }}>
      {props.children}
    </CartContext.Provider>
  );
};
