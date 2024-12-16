import {useContext, useMemo} from 'react';
import {CartContext} from '../../cartContextProvider/CartContext';
import {Product} from '../../model/Product';
import {ProductService} from '../../service';
import {useQuery} from 'react-query';
export const useGetProductListPage = () => {
  const productsQuery = useQuery(['products'], ProductService.getProductList);
  const products: Product[] = productsQuery.data || [];
  const {listProduct, addProductToCart} = useContext(CartContext);

  const quantityInCart = useMemo(() => {
    return listProduct.reduce((acc, prd) => acc + prd.quantity, 0);
  }, [listProduct]);

  const addToCart = (product: Product) => {
    if (!product) {
      return null;
    }
    const productInCart = {
      ...product,
      quantity: 1,
      selectedVariation: product.variations[0],
    };
    addProductToCart(productInCart);
  };
  return {productsQuery, products, quantityInCart, addToCart};
};
