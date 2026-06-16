import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          dispatch(logout());
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'R'}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || 'Renzo'}</Text>
        <Text style={styles.email}>{user?.email || 'testpracticaluser001@mailinator.com'}</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help & Support</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: { fontSize: 26, fontWeight: '700', color: '#111111' },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3DB28C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: '#FFFFFF' },
  name: { fontSize: 18, fontWeight: '600', color: '#111111', marginBottom: 4 },
  email: { fontSize: 13, color: '#888888' },
  section: { paddingTop: 8 },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuText: { fontSize: 15, color: '#222222' },
  chevron: { fontSize: 20, color: '#CCCCCC' },
  logoutBtn: {
    margin: 24,
    borderWidth: 1,
    borderColor: '#FF4444',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: { fontSize: 15, color: '#FF4444', fontWeight: '600' },
});
