import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

interface VariantsProps {
  variations: string[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export const Variants = ({
  selectedIndex = 0,
  variations,
  onSelect,
}: VariantsProps) => {
  const [selected, setSelected] = React.useState(selectedIndex);
  const selectVariant = (index: number) => {
    setSelected(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  return (
    <View>
      <Text style={styles.title}> Variants </Text>
      <View style={styles.variantsContainer}>
        {variations.map((variation, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                selectVariant(index);
              }}
              key={index}>
              <View
                style={
                  index === selected
                    ? styles.variantBoxSelected
                    : styles.variantBox
                }>
                <Text style={styles.text}>{variation}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  variantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  variantBox: {
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  },
  variantBoxSelected: {
    padding: 5,
    borderColor: 'blue',
    borderWidth: 2,
    margin: 5,
  },
  text: {
    color: 'black',
  },
});
