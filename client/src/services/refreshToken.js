import createRefresh from 'react-auth-kit/createRefresh';
import axios from 'axios';

// @ts-ignore
const refresh = createRefresh({
    interval: 10, // The time in sec to refresh the Access token
    refreshApiCallback: async (param) => {
        try {
            // Send the request to the /refresh_token endpoint, where the refresh token is automatically sent via cookies
            const response = await axios.post("/refresh_token", param, {
                headers: {
                    'Authorization': `Bearer ${param.authToken}` // Send the current access token as authorization
                }
            });

            console.log("Refreshing");

            // If refresh is successful, return the new access token
            return {
                isSuccess: true,
                newAuthToken: response.data.token, // New access token
                newAuthTokenExpireIn: 10, // Expiry time of the new access token (you can update this if you know the actual expiration time)
                newRefreshTokenExpiresIn: 60 // Refresh token expiry time (if needed)
            };
        } catch (error) {
            console.error("Refresh token error:", error);
            return {
                isSuccess: false
            };
        }
    }
});

export default refresh;