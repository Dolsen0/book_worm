import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Image , ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function BookItem({ item, onSelect }) {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onSelect(item)}>
      <Text style={styles.itemText}>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );
}

function SearchScreen({ navigation }) {
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
    navigation.navigate('Details', { book });
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

function DetailsScreen({ route }) {
  const { book } = route.params;

  const imageUrl = book.volumeInfo.imageLinks?.thumbnail;
  const authors = book.volumeInfo.authors?.join(', ');
  const description = book.volumeInfo.description;

  return (
    <ScrollView style={styles.detailsContainer}>
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />}
      <Text style={styles.authors}>{authors}</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
  image: {
    height: 200,
    marginVertical: 10,
  },
  authors: {
    fontSize: 20,
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 50,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  detailsImage: {
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  detailsAuthors: {
    fontSize: 20,
    marginBottom: 20,
    color: '#666',
  },
  detailsDescription: {
    fontSize: 16,
    color: '#444',
  },
});