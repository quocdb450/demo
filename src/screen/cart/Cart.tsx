/**
 * @file Cart.tsx
 * @description This file contains the definition of the Cart component.
 * It displays the items added to the cart and allows users to proceed to checkout.
 **/

import React, {useContext} from 'react';
import {View, Button, StyleSheet, Text} from 'react-native';
import {CartContext} from '../../cartContextProvider/CartContext';
import {ProductInCart} from '../../model/Product';
import {ProductItem} from '../../components/ProductItem';
import {AppStackNavProp} from '../../routes/AppStack';

export const Cart = ({navigation}: {navigation: AppStackNavProp<'Cart'>}) => {
  const {listProduct, clear} = useContext(CartContext);

  const clearProduct = () => {
    clear();
  };

  return (
    <View>
      {listProduct.length > 0 ? (
        listProduct.map((product: ProductInCart, index) => (
          <View  key={`${product.id}_${product.selectedVariation}`}>
            <ProductItem
              product={product}
              onPressTile={() => {navigation.navigate('ProductDetailPage', {id: product.id, title: product.name});}}
              onPressAddCart={() => {}}
              inCart
            />
            { index < listProduct.length - 1  && <View style={styles.seperator} />}
          </View>
        ))
      ) : (
        <Text> Cart is empty!</Text>
      )}
      <View style={styles.bottomView}>
        <Button
          disabled={listProduct.length === 0}
          title="Clear Cart"
          onPress={() => {
            clearProduct();
          }}
        />
        <Button
          disabled={listProduct.length === 0}
          title="Process to Checkout"
          onPress={() => {
            navigation.navigate('Checkout');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  seperator: {
    height: 1,
    backgroundColor: 'black',
  },
  bottomView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
