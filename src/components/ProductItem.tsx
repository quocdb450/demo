import React from 'react';
import {Product, ProductInCart} from '../model/Product';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {loadImages} from '../utils';

const addToCartImg = require('../assets/addToCart.png');

const ROW_HEIGHT = 100;
interface ProductItemProps {
  product: Product | ProductInCart;
  onPressTile: (product: Product) => void;
  onPressAddCart: (product: Product) => void;
  inCart?: boolean;
}
export const ProductItem = (props: ProductItemProps) => {
  const {product, onPressTile, onPressAddCart, inCart = false} = props;
  return (
    <TouchableOpacity onPress={() => onPressTile(product)}>
      <View style={styles.row}>
        <Image
          source={loadImages(product.image)}
          style={styles.image}
          alt={product.name}
        />
        <View style={styles.row_details}>
          <Text>{product.name}</Text>
        </View>
        {!inCart ? (
          <View style={styles.addToCartView}>
            <TouchableOpacity
              onPress={() => {
                onPressAddCart(product);
              }}>
              <Image
                source={addToCartImg}
                style={styles.addToCartImg}
                alt="Add to cart"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addToCartView}>
            <View style={styles.variantBox}>
              <Text style={styles.text}>
                {(product as ProductInCart).selectedVariation}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>
                Quantity: {(product as ProductInCart).quantity}
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  image: {
    height: ROW_HEIGHT,
    width: ROW_HEIGHT,
    resizeMode: 'contain',
  },
  row_details: {
    marginLeft: 10,
    flexGrow: 1,
    justifyContent: 'center',
  },
  addToCartImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  addToCartView: {
    justifyContent: 'center',
    padding: 10,
  },
  variantBox: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  },
  text: {
    color: 'black',
  },
});
