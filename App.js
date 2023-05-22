import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

function BookItem({ item, onSelect }) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}>
      <Text style={styles.itemText}>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  function searchBooks() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.items);
      });
  }

  function selectBook(book) {
    console.log(book);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Worm</Text>
      <TextInput 
        style={styles.input} 
        placeholder='Search Books'
        onChangeText={text => setSearchTerm(text)}
        onSubmitEditing={searchBooks}
      />
      <Button title="Search" onPress={searchBooks} color='#48BBEC' />
      <View style={styles.list}>
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookItem item={item} onSelect={selectBook} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#48BBEC',
  },
  input: {
    height: 50,
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  list: {
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
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
