/**
 * @file ProductListPage.tsx
 * @description This file contains the definition of the ProductListPage component.
 * It displays a list of products.
 */

import React, {useEffect, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import {useGetProductListPage} from './useGetProductListPage';
import {Product} from '../../model/Product';
import { AppStackScreenProps} from '../../routes/AppStack';
import {ProductItem} from '../../components/ProductItem';
import {CartWithBadge} from '../../components/CartWithBadge';

const ROW_HEIGHT = 100;

const renderItemSeperator = () => {
  return <View style={styles.flatListSeperator} />;
};

export const ProductListPage = ({
  navigation,
}: AppStackScreenProps<'ProductListPage'>) : JSX.Element  => {
  const {productsQuery, products, quantityInCart, addToCart} =
    useGetProductListPage();
  const [textFilter, setTextFilter] = React.useState('');
  const [filteredProducts, setFilteredProducts] =
    React.useState<Product[]>(products);

  const onPressCart = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  const cartButton = useMemo(() =>{
    return ( <CartWithBadge onPress={onPressCart} badge={quantityInCart} />);
  },[onPressCart, quantityInCart]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: event => {
          setTextFilter(event.nativeEvent.text);
        },
      },
      headerRight: () => cartButton,
    });
  }, [navigation, cartButton]);

  useEffect(() => {
    if (textFilter === '') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => {
          return (
            product.name.toLowerCase().includes(textFilter.toLowerCase()) ||
            product.type.toLowerCase().includes(textFilter.toLowerCase()) ||
            product.details.toLowerCase().includes(textFilter.toLowerCase())
          );
        }),
      );
    }
  }, [textFilter, products]);

  const onPressTile = useCallback((product: Product) => {
    navigation.navigate('ProductDetailPage', {id: product.id, title: product.name});
  },[navigation]);

  const onPressAddCart = useCallback((product: Product) => {
    addToCart(product);
  },[addToCart]);

  const renderItem = ({item}: {item: Product}) => {
    return (
      <ProductItem
        product={item}
        onPressTile={onPressTile}
        onPressAddCart={onPressAddCart}
      />
    );
  };

  if (productsQuery.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (productsQuery.isError) {
    return (
      <View>
        <Text>Something went wrong....</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredProducts}
        contentContainerStyle={styles.flatListContainer}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={renderItemSeperator}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
