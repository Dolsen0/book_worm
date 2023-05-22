import React from 'react';
import { StyleSheet, Text, ScrollView, Image, Linking, View } from 'react-native';

export default function DetailsScreen({ route }) {
  const { book } = route.params;

  const imageUrl = book.volumeInfo.imageLinks?.thumbnail;
  const authors = book.volumeInfo.authors?.join(', ');
  const description = book.volumeInfo.description;
  const pageCount = book.volumeInfo.pageCount;
  const averageRating = book.volumeInfo.averageRating;
  const ratingsCount = book.volumeInfo.ratingsCount;
  const previewLink = book.volumeInfo.previewLink;

  return (
    <ScrollView 
    style={styles.detailsContainer} 
    contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      {imageUrl && <Image style={styles.image} source={{ uri: imageUrl }} resizeMode="contain" />}
      <Text style={styles.authors}>{authors}</Text>
      <Text style={styles.pageCount}>Page Count: {pageCount}</Text>
      <Text style={styles.ratingInfo}>Average Rating: {averageRating}, Ratings: {ratingsCount}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.previewLinkContainer}>
        <Text style={styles.previewLink}>Preview: <Text style={styles.link} onPress={() => Linking.openURL(previewLink)}>Click Here</Text></Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#48BBEC',
  },
  image: {
    height: 200,
    marginVertical: 10,
  },
  authors: {
    fontSize: 20,
    marginVertical: 10,
  },
  pageCount: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  ratingInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  previewLinkContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#48BBEC',
    borderRadius: 5,
    alignSelf: 'center',
  },
  previewLink: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  link: {
    color: '#ffffff',
    textDecorationLine: 'underline',
  },
});
