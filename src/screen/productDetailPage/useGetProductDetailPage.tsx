import {Product} from '../../model/Product';
import {ProductService} from '../../service';
import {useQuery} from 'react-query';

export const useGetProductDetailPage = (id: string) => {
  const productDetailsQuery = useQuery(['product', id], () =>
    ProductService.getProductDetail(id),
  );

  const product = productDetailsQuery.data as Product;

  return {
    productDetailsQuery,
    product,
  };
};
