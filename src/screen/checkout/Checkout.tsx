/**
 * @file Checkout.tsx
 * @description This file contains the definition of the Checkout component.
 * It handles the checkout process for the items in the cart.
 **/

import React, {useContext} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import {CartContext} from '../../cartContextProvider/CartContext';
import {ProductInCart} from '../../model/Product';
import {ProductItem} from '../../components/ProductItem';
import {KeyboardAvoidingView} from 'react-native';
import {useCheckout} from './useCheckout';
import {AppStackNavProp} from '../../routes/AppStack';

export const Checkout = ({
  navigation,
}: {
  navigation: AppStackNavProp<'Checkout'>;
}) => {
  const {listProduct} = useContext(CartContext);
  const {onTextChange, submit, error} = useCheckout({navigation});
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
      <ScrollView>
        <View style={styles.container}>
          {listProduct.map((product: ProductInCart, index) => (
            <View key={`${product.id}_${product.selectedVariation}`}>
              <ProductItem
                product={product}
                onPressTile={() => {
                  navigation.navigate('ProductDetailPage', {
                    id: product.id,
                    title: product.name,
                  });
                }}
                onPressAddCart={() => {}}
                inCart
              />
              {index < listProduct.length - 1 && (
                <View style={styles.seperator} />
              )}
            </View>
          ))}
          <View style={styles.form_box}>
            <Text style={styles.title}>Information</Text>
            <TextInput
              placeholder="Name"
              id="name"
              style={styles.input}
              onChangeText={text => onTextChange('fullName', text)}
            />
            <Text style={styles.error}>{error.fullName}</Text>
            <TextInput
              placeholder="Phone"
              keyboardType="phone-pad"
              id="phone"
              style={styles.input}
              onChangeText={text => onTextChange('phone', text)}
            />
            <Text style={styles.error}>{error.phone}</Text>
            <TextInput
              placeholder="Address"
              id="address"
              style={styles.input}
              onChangeText={text => onTextChange('address', text)}
            />
            <Text style={styles.error}>{error.address}</Text>
          </View>
          <View style={styles.form_box}>
            <Text style={styles.title}>Payment</Text>

            <View>
              <TextInput
                placeholder="Credit Card Number"
                id="creditcard"
                style={styles.input}
                keyboardType="numeric"
                maxLength={16}
                onChangeText={text => onTextChange('creditcard', text)}
              />
              <Text style={styles.error}>{error.creditcard}</Text>
            </View>
            <View style={styles.credit_expire_ccv}>
              <View style={styles.flex1}>
                <TextInput
                  id="expire"
                  placeholder="Expires (MM/YY)"
                  style={styles.input}
                  onChangeText={text => onTextChange('expire', text)}
                />
                <Text style={styles.error}>{error.expire}</Text>
              </View>
              <View style={styles.flex1}>
                <TextInput
                  id="ccv"
                  placeholder="CCV"
                  keyboardType="numeric"
                  maxLength={3}
                  style={styles.input}
                  onChangeText={text => onTextChange('ccv', text)}
                />
                <Text style={styles.error}>{error.ccv}</Text>
              </View>
            </View>
            <View style={styles.button}>
              <Button title="Submit" onPress={() => submit()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  seperator: {
    height: 1,
    backgroundColor: 'black',
  },
  bottomView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    marginTop: 5,
    minHeight: 40,
    borderRadius: 5,
    padding: 5,
  },
  button: {marginTop: 10},
  credit_expire_ccv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  error: {
    color: 'red',
  },
  form_box: {
    margin: 5,
  },
  flex1: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
