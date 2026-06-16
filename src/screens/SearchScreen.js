import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import EventCard from '../components/EventCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const events = useSelector((state) => state.events.list);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return events.filter((e) => {
      const name = (e.title || e.name || '').toLowerCase();
      const location = (e.city || e.location || '').toLowerCase();
      const style = (e.dance_style || '').toLowerCase();
      return name.includes(q) || location.includes(q) || style.includes(q);
    });
  }, [query, events]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search</Text>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.input}
            placeholder="Search events, locations, styles…"
            placeholderTextColor="#AAAAAA"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            returnKeyType="search"
          />
        </View>
      </View>

      {query.trim() === '' ? (
        <View style={styles.hint}>
          <Text style={styles.hintText}>Search events by name, city, or dance style</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.hint}>
          <Text style={styles.hintText}>No events match "{query}"</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F7F7F7',
  },
  searchIcon: { fontSize: 20, color: '#AAAAAA', marginRight: 8 },
  input: { flex: 1, fontSize: 14, color: '#111111', paddingVertical: 10 },
  hint: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  hintText: { fontSize: 14, color: '#BBBBBB' },
});
