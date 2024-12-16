import products from '../data/Product.json';

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

//get product list
const getProductList = async () => {
  //simulate delay on I/O operation
  await delay(3000);
  return products;
};

//get product detail
const getProductDetail = async (id: string) => {
  //simualte delay on I/O operation
  await delay(3000);
  return products.find(prd => prd.id === id);
};

export const ProductService = {
  getProductList,
  getProductDetail,
};
