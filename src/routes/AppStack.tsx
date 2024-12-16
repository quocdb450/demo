/**
 * @file AppStack.tsx
 * @description This file contains the definition of the AppStack component and related types.
 * It sets up the navigation stack for the application, including the ProductListPage,ProductDetailPage, Cart and Checkout screen
 */

import * as React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {ProductDetailPage} from '../screen/productDetailPage';
import {ProductListPage} from '../screen/productListPage';
import {RouteProp} from '@react-navigation/native';
import {CartContextProvider} from '../cartContextProvider/CartContextProvider';
import {Cart} from '../screen/cart/Cart';
import {Checkout} from '../screen/checkout/Checkout';
import { Button } from 'react-native';

export type AppStackParams = {
  ProductDetailPage: {id: string; title: string};
  ProductListPage: undefined;
  Cart: undefined;
  Checkout: undefined;
};

export type AppStackRouteNames = keyof AppStackParams;

export type AppStackRouteProp<
  RouteName extends AppStackRouteNames
> = RouteProp<AppStackParams, RouteName>;

export type AppStackNavProp<
  RouteName extends AppStackRouteNames
> = NativeStackNavigationProp<AppStackParams, RouteName>;

export type AppStackScreenProps<
  RouteName extends AppStackRouteNames
> = {
  route: AppStackRouteProp<RouteName>;
  navigation: AppStackNavProp<RouteName>;
};

const Stack = createNativeStackNavigator<AppStackParams>();

const createHomeButton = ({navigation}: {navigation: any}) => <Button title="Home" onPress={() => navigation.popToTop()} />;

export const AppStack = () => {
  return (
    <CartContextProvider>
      <Stack.Navigator initialRouteName="ProductListPage">
        <Stack.Screen name="ProductListPage" component={ProductListPage}  options={{ headerTitle: 'Product List'}}/>
        <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} options={({route}) =>{
          return {
            headerTitle: route.params.title,
          };

        }}/>
        <Stack.Screen name="Cart" component={Cart} options={({navigation}) => ({
          headerRight: () => createHomeButton({navigation}),
        })}/>
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </CartContextProvider>
  );
};
