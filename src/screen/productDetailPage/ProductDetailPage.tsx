/**
 * @file ProductDetailPage.tsx
 * @description This file contains the definition of the ProductDetailPage component.
 * It displays the details of a selected product.
 **/

import React, {useContext} from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useGetProductDetailPage} from './useGetProductDetailPage';
import {AppStackScreenProps} from '../../routes/AppStack';
import {Variants} from '../../components/Variants';
import {CartContext} from '../../cartContextProvider/CartContext';
import { loadImages } from '../../utils';

export const ProductDetailPage = ({
  route,
  navigation,
}: AppStackScreenProps<'ProductDetailPage'>) : JSX.Element  => {
  const id = route.params?.id ?? '';
  const {productDetailsQuery, product} = useGetProductDetailPage(id);
  const {addProductToCart} = useContext(CartContext);
  const [selectedVariant, setSelectedVariant] = React.useState(
    product?.variations[0],
  );

  if (productDetailsQuery.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (productDetailsQuery.isError) {
    return (
      <View>
        <Text>Something went wrong...</Text>
      </View>
    );
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const onSelect = (index: number) => {
    setSelectedVariant(product?.variations[index]);
  };

  const addToCart = () => {
    if (product) {
      addProductToCart({
        ...product,
        selectedVariation: selectedVariant ?? product.variations[0],
        quantity: 1,
      });
    }
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.image_view}>
        <Image
          source={loadImages(product.image)}
          style={styles.image}
          alt={product.name}
        />
      </View>
      <View style={styles.info_container}>
        <Text style={styles.title}>Type</Text>
        <Text>{product.type}</Text>
        <Variants variations={product.variations} onSelect={onSelect} />
        <Text style={styles.title}>Description</Text>
        <Text>{product.details}</Text>
        <View style={styles.button}>
          <Button title="Add to cart" onPress={() => addToCart()} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContainer: {
    gap: 10,
  },
  flatListSeperator: {
    height: 1,
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    maxWidth: '100%',
    maxHeight: 300,
    resizeMode: 'contain',
    padding: 0,
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
  button: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  image_view: {
    alignSelf: 'center',
    height: 300,
    padding: 0,
    margin: 0,
  },
  info_container: {
    padding: 25,
    flex: 1,
  },
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
