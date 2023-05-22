import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BookItem({ item, onSelect }) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}>
      <Text style={styles.itemText}>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    elevation: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 18,
  },
});