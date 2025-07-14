import api from "./api";
import { setAccessToken, setRefreshToken } from "./storage";

export const login = async (code: string) => {
    try {
        // endpoint: '/api/auth/login; 
        // method: 'POST';
        // body: { code };

        // responce structure:
        // {
        //     "data": {
        //         "accessToken": null,
        //         "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNWZmZTZiOS1lMjY2LTRhMWEtODNjZC02N2QyMjQ0NzUyMjIiLCJpYXQiOjE3NTIzODUxNjcsImV4cCI6MTc4MzkyMTE2N30.-Zcsys9Fe8UdU01sDo3iCO4owQ9XbX1LnItUeuhfqdg"
        //     },
        //     "message": "Muaffaqqiyatli kirildi!",
        //     "timestamp": "2025-07-13T10:39:27.982080",
        //     "status": 200
        // }
        if (!code || code.length !== 6) {
            throw new Error('Invalid code. Please enter a 6-digit code.');
        }
        const refreshTokenResponse = await api.post('/api/auth/login', { code });
        const { refreshToken } = refreshTokenResponse.data.data;
        if (!refreshToken) {
            throw new Error('Login failed. No refresh token received.');
        }

        // Save the refresh token to storage
        await setRefreshToken(refreshToken);
        console.log('Login successful, refresh token saved:', refreshToken);


        // get access token
        const accessTokenResponse = await api.post('/api/auth/refresh', {refreshToken});
        const { accessToken } = accessTokenResponse.data.data;
        if (!accessToken) {
            throw new Error('Login failed. No access token received.');
        }
        console.log('Access token received:', accessToken);
        // Save the access token to storage
        await setAccessToken(accessToken);
        console.log('Access token saved successfully.');
        
        return {
            accessToken,
            refreshToken,
            message: 'Login successful. Access token and refresh token saved.',
            status: 200,
        }
    } catch (error: any) {
        console.error('Login failed:', error);
        throw new Error(error.message || 'Login failed. Please try again.');
        
    }
}

export const logout = async () => {
    try {
        
        // Clear tokens from storage
        await setAccessToken(null);
        await setRefreshToken(null);
        
    } catch (error: any) {
        console.error('Logout failed:', error);
        throw new Error(error.message || 'Logout failed. Please try again.');
    }
}