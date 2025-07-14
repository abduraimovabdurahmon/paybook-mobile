import colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Agar oxirgi inputga raqam kiritilgan bo'lsa va kod to'liq bo'lsa, handleLogin ni chaqir
    if (index === code.length - 1 && text && newCode.every(digit => digit !== '')) {
      // Klaviturani yopish
      Keyboard.dismiss();
      handleLogin(newCode); // newCode ni uzatamiz
    }

    // Keyingi inputga fokusni o'tkazish
    if (text && index < code.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = async (codeArray: string[] = code) => {
    const fullCode = codeArray.join('');
    if (fullCode.length !== codeArray.length) {
      Alert.alert('Xatolik', 'Iltimos, toʻliq kodni kiriting.');
      return;
    }
    console.log('Kiritilgan kod:', fullCode);

    try {
      setIsLoading(true);
      await login(fullCode);
      router.replace('/(main)/home');
    } catch (error: any) {
      console.error('Login failed:', error);
      Alert.alert('Xatolik', error?.response?.data?.message || 'Kirishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
      setCode(['', '', '', '', '', '']); // Kodni tozalash
      inputRefs.current.forEach(ref => ref?.clear()); // Inputlarni tozalash
      inputRefs.current[0]?.focus(); // Birinchi inputga fokusni qaytarish
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors.primary }}>
          Paybook.uz
        </Text>
        <View style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => { inputRefs.current[index] = ref; }}
              style={styles.input}
              maxLength={1}
              keyboardType="numeric"
              textAlign="center"
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <Text style={styles.message}>
          Telegramda{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://t.me/paybook_robot')}
          >
            @paybook_robot
          </Text>{' '}
          botidan 1 daqiqalik kodingizni oling va bu yerga qo'ying.
        </Text>
        <TouchableOpacity
          style={[styles.button, { opacity: code.every(digit => digit !== '') && !isLoading ? 1 : 0.5 }]}
          disabled={!code.every(digit => digit !== '') || isLoading}
          onPress={() => handleLogin()} // Tugma bosilganda default code ishlatiladi
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Tasdiqlash</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: 45,
    height: 45,
    borderWidth: 0,
    borderRadius: 12,
    backgroundColor: '#F1F1F5',
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  link: {
    color: '#5856D6',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.green,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});