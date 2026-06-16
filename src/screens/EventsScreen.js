import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../redux/eventsSlice';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
  const dispatch = useDispatch();
  const { list: events, loading, error } = useSelector(state => state.events);
  const { token } = useSelector(state => state.auth);

  const loadEvents = () => {
    const authToken = token || '148|QwsMFixT9w9MgleAbukZtghUuKNZGxgR1SYDOVMk';
    dispatch(fetchEvents(authToken));
  };

  const renderItem = ({ item }) => <EventCard event={item} />;

  const keyExtractor = (item, index) =>
    item.id ? item.id.toString() : index.toString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subGreeting}>Are you ready to dance?</Text>
      </View>

      {loading && events.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#3DB28C" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Failed to load events.</Text>
          <Text style={styles.retryText} onPress={loadEvents}>
            Tap to retry
          </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={loadEvents}
              tintColor="#3DB28C"
            />
          }
          contentContainerStyle={
            events.length === 0 ? styles.emptyContainer : null
          }
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No events found.</Text>
            </View>
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
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
  },
  subGreeting: {
    fontSize: 14,
    color: '#888888',
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  errorText: {
    fontSize: 15,
    color: '#888888',
    marginBottom: 8,
  },
  retryText: {
    fontSize: 14,
    color: '#3DB28C',
    textDecorationLine: 'underline',
  },
  emptyText: {
    fontSize: 15,
    color: '#AAAAAA',
  },
});
