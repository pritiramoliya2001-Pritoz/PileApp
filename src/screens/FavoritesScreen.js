import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import EventCard from '../components/EventCard';

export default function FavoritesScreen() {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favourites</Text>
        <Text style={styles.subtitle}>
          {favorites.length} event{favorites.length !== 1 ? 's' : ''} saved
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on any event to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
  },
  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 56,
    color: '#DDDDDD',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#AAAAAA',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
    lineHeight: 20,
  },
});
