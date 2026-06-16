import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/favoritesSlice';

export default function EventCard({ event }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === event.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(event));
  };

  // Parse tags/categories
  const tags = [];
  if (event.event_type) tags.push(event.event_type);
  if (event.dance_style) tags.push(event.dance_style);
  if (event.sub_style) tags.push(event.sub_style);
  // Flatten if arrays
  const flatTags = tags.flat().filter(Boolean).slice(0, 4);

  // Format date
  const formatDate = (start, end) => {
    if (!start) return '';
    return end ? `${start} – ${end}` : start;
  };

  const dateStr = event.start_date
    ? formatDate(event.start_date, event.end_date)
    : event.event_date || '';

  const priceStr = event.price_range || event.price || '';

  const location = event.city && event.country
    ? `${event.city}, ${event.country}`
    : event.location || '';

  const imageUri = event.event_image || event.image || null;

  return (
    <View style={styles.card}>
      <View style={styles.thumbnail}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.thumbImage} resizeMode="cover" />
        ) : (
          <View style={styles.thumbPlaceholder}>
            <Text style={styles.thumbInitial}>
              {(event.title || event.name || 'E').charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {event.title || event.name}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.date}>{dateStr}</Text>
          {location ? <Text style={styles.location}>{location}</Text> : null}
        </View>

        {priceStr ? <Text style={styles.price}>{priceStr}</Text> : null}

        <View style={styles.bottomRow}>
          <View style={styles.tagsRow}>
            {flatTags.map((tag, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.shareIcon}>⬆</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleFavorite}>
              <Text style={[styles.heartIcon, isFavorite && styles.heartActive]}>
                {isFavorite ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
    flexShrink: 0,
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbInitial: {
    fontSize: 28,
    fontWeight: '700',
    color: '#888888',
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
    flex: 1,
    marginRight: 4,
  },
  arrowIcon: {
    fontSize: 22,
    color: '#AAAAAA',
    marginTop: -2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: '#888888',
    flex: 1,
  },
  location: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'right',
  },
  price: {
    fontSize: 11,
    color: '#888888',
    marginTop: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    flex: 1,
  },
  tag: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 10,
    color: '#555555',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  actionBtn: {
    padding: 2,
  },
  shareIcon: {
    fontSize: 16,
    color: '#888888',
  },
  heartIcon: {
    fontSize: 18,
    color: '#BBBBBB',
  },
  heartActive: {
    color: '#3DB28C',
  },
});
