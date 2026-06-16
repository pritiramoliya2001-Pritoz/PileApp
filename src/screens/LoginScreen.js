import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../redux/authSlice';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      navigation.replace('MainTabs');
    }
  }, [navigation, token]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        { text: 'OK', onPress: () => dispatch(clearError()) },
      ]);
    }
  }, [dispatch, error]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }
    dispatch(loginUser({ email: email.trim(), password: password.trim() }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Pliē</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@email.com"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signInBtn}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.signInText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.signUpText}>
              Not a member? <Text style={styles.signUpLink}>Sign Up Here</Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or Sign In with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIcon}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <Text style={styles.socialIconApple} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, styles.facebookBtn]}>
              <Text style={styles.facebookText}>f</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.replace('MainTabs')}>
            <Text style={styles.guestText}>Enter as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flexGrow: 1,
  },
  logoContainer: {
    height: 220,
    backgroundColor: '#EBEBEB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 44,
    fontWeight: '300',
    color: '#111111',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  formContainer: {
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 40,
  },
  label: {
    fontSize: 13,
    color: '#333333',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: '#111111',
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 22,
  },
  forgotText: {
    fontSize: 12,
    color: '#666666',
  },
  signInBtn: {
    backgroundColor: '#3DB28C',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666666',
    marginBottom: 28,
  },
  signUpLink: {
    color: '#333333',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    color: '#999999',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 28,
  },
  socialBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialIcon: {
    fontSize: 18,
    color: '#EA4335',
    fontWeight: '700',
  },
  socialIconApple: {
    fontSize: 20,
    color: '#000000',
  },
  facebookBtn: {
    backgroundColor: '#1877F2',
    borderColor: '#1877F2',
  },
  facebookText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  guestText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});
