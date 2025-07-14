import colors from '@/constants/Colors';
import { globalStyles } from '@/constants/Styles';
import api from '@/services/api';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  
  const [userData, setUserData] = useState({
    name: '',
    phoneNumber: '',
    username: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      setIsLoading(true);
      setRefreshing(true);
      const response = await api.get('/api/users/me');
      const data = response.data;
      setUserData(data);
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await api.put('/api/users/me', {
        name: userData.name,
        username: userData.username
      });
      console.log('Update payload:', { name: userData.name, username: userData.username });
      const updatedData = response.data;
      setUserData(updatedData);
      setIsEditing(false);
      Alert.alert('Success', 'Ma\'lumotlar muvaffaqiyatli yangilandi');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const onRefresh = () => {
    fetchData();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/(main)/settings')}
      >
        <MaterialIcons name="arrow-back" size={24} color={colors.white} style={styles.icon} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, globalStyles.container]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.white]}
            tintColor={colors.white}
          />
        }
      >
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={80} color={colors.white} style={styles.icon} />
          </View>
          
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Shaxsiy ma'lumotlarim</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ism:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={userData.name}
                  onChangeText={(text) => setUserData({...userData, name: text})}
                  placeholder="Ismingizni kiriting"
                  placeholderTextColor={colors.gray}
                />
              ) : (
                <Text style={styles.infoText}>{userData.name || 'Not set'}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Tel:</Text>
              {isEditing ? (
                <TextInput
                  editable={false}
                  style={styles.input}
                  value={userData.phoneNumber || ''}
                />
              ) : (
                <Text style={styles.infoText}>{userData.phoneNumber || 'Not set'}</Text>
              )}
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Username:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={userData.username || ''}
                  onChangeText={(text) => setUserData({...userData, username: text})}
                  placeholder="Usernameingizni kiriting"
                  placeholderTextColor={colors.gray}
                />
              ) : (
                <Text style={styles.infoText}>{userData.username || 'Mavjud emas'}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.editButton, isSaving && styles.editButtonDisabled]}
              onPress={() => isEditing ? handleSave() : setIsEditing(true)}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.editButtonText}>
                  {isEditing ? "O'zgarishlarni saqlash" : "O'zgartirish"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    marginBottom: 16,
  },
  icon: {
    opacity: 0.7,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 30,
    padding: 24,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '500',
    color: colors.dark,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'JetBrainsMono-Bold',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
    width: 100,
    fontFamily: 'JetBrainsMono-Bold',
  },
  infoText: {
    fontSize: 16,
    color: colors.dark,
    flex: 1,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '500',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 16,
    padding: 12,
    fontSize: 16,
    color: colors.dark,
    backgroundColor: colors.white,
    fontFamily: 'JetBrainsMono-Bold',
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: colors.dark,
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.7,
  },
  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'JetBrainsMono-Bold',
  },
});