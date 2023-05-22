import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, ScrollView, Pressable, Image } from 'react-native';
import BookItem from './BookItem';

export default function SearchScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isListView, setIsListView] = useState(true); 

  function searchBooks() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setBooks(data.items);
      });
  }

  function selectBook(book) {
    navigation.navigate('Details', { book });
  }

  function clearSearch() {
    setSearchTerm('');
  }

  function toggleView() {
    setIsListView(!isListView);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Worm</Text>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.input} 
          placeholder='Search Books'
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          onSubmitEditing={searchBooks}
        />
        {searchTerm !== '' && (
          <Pressable onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </Pressable>
        )}
      </View>
      <Button title="Search" onPress={searchBooks} color='#48BBEC' />
      <Button title={isListView ? "Switch to Card View" : "Switch to List View"} onPress={toggleView} />
      <View style={styles.list}>
        {isListView ? (
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookItem item={item} onSelect={selectBook} />}
          />
        ) : null}
        {!isListView ? (
          <FlatList
            data={books}
            numColumns={2}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectBook(item)} style={styles.card}>
                <Image source={{ uri: item.volumeInfo.imageLinks?.thumbnail }} style={styles.cardImage} />
                <Text style={styles.cardText}>{item.volumeInfo.title}</Text>
              </TouchableOpacity>
            )}
          />
        ) : null}
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  clearButton: {
    padding: 5,
  },
  clearButtonText: {
    fontSize: 20,
    color: '#777',
  },
  list: {
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    overflow: 'hidden',
  },
  cardImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
