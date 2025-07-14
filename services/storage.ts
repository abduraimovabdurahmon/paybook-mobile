import AsyncStorage from "@react-native-async-storage/async-storage";

// Access token management functions
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}

export const setAccessToken = async (token: string | null): Promise<void> => {
  try {
    if (token !== null) {
      await AsyncStorage.setItem('accessToken', token);
    } else {
      await AsyncStorage.removeItem('accessToken');
    }
  } catch (error) {
    console.error('Error setting access token:', error);
  }
}

export const removeAccessToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error removing access token:', error);
  }
}



// Refresh token management functions
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    return token;
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
}

export const setRefreshToken = async (token: string | null): Promise<void> => {
  try {
    if (token !== null) {
      await AsyncStorage.setItem('refreshToken', token);
    } else {
      await AsyncStorage.removeItem('refreshToken');
    }
  } catch (error) {
    console.error('Error setting refresh token:', error);
  }
}

export const removeRefreshToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Error removing refresh token:', error);
  }
}

