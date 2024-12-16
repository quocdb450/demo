import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet, Text} from 'react-native';
const addToCartImg = require('../assets/addToCart.png');

interface CartWithBadgeProps {
  onPress?: () => void;
  badge: number;
}
export const CartWithBadge = ({badge, onPress}: CartWithBadgeProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}>
      <View>
        <Image
          source={addToCartImg}
          style={styles.addToCartImg}
          alt="Add to cart"
        />
        {badge > 0 && (
          <View style={styles.badge}>
            <Text>{badge}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addToCartImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -5,
    right: -5,
  },
});
