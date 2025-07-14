import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import { useAuth } from '@/context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  type MaterialIconName = React.ComponentProps<typeof MaterialIcons>['name'];

  const settingsOptions: { title: string; icon: MaterialIconName; action: () => void }[] = [
    {
      title: 'Profil ma\'lumotlari',
      icon: 'person-outline',
      action: () => router.push('/settings/profile'),
    },
    {
      title: 'Tilni o\'zgartirish',
      icon: 'language',
      action: () => router.push('/settings/language'),
    },
    {
      title: 'Maxfiylik sozlamalari',
      icon: 'lock-outline',
      action: () => router.push('/settings/privacy'),
    },
    {
      title: 'Chiqish',
      icon: 'logout',
      action: async () => {
        try {
          await logout();
          router.replace('/(auth)/login');
        } catch (error) {
          Alert.alert('Xatolik', 'Chiqishda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
        }
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Sozlamalar</Text>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              option.title === 'Chiqish' ? styles.logoutOption : styles.regularOption,
            ]}
            onPress={option.action}
            activeOpacity={0.8}
          >
            <View style={styles.optionContent}>
              <MaterialIcons
                name={option.icon}
                size={24}
                color={option.title === 'Chiqish' ? colors.white : colors.dark}
                style={styles.icon}
              />
              <Text
                style={[
                  styles.optionText,
                  option.title === 'Chiqish' ? styles.logoutText : styles.regularText,
                ]}
              >
                {option.title}
              </Text>
              {option.title !== 'Chiqish' && (
                <MaterialIcons name="chevron-right" size={24} color={colors.dark} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 24,
    paddingTop: 48,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  content: {
    flex: 1,
    ...globalStyles.container,
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    color: colors.white,
    marginBottom: 28,
    fontFamily: 'JetBrainsMono-Bold',
  },
  option: {
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  regularOption: {
    backgroundColor: colors.white,
  },
  logoutOption: {
    backgroundColor: colors.dark,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '500',
  },
  regularText: {
    color: colors.dark,
  },
  logoutText: {
    color: colors.white,
  },
  icon: {
    opacity: 0.7,
  },
});