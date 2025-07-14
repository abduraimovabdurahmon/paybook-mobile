import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to main screen
  if (isAuthenticated) {
    return <Redirect href={"/(auth)/login"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}