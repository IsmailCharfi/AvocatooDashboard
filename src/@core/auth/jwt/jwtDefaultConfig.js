// ** Auth Endpoints
import env from "react-dotenv"

const API_PATH = env.API_URL

export default {
  loginEndpoint: `${API_PATH}/auth/login/admin`,
  registerEndpoint: `${API_PATH}/auth/register`,
  refreshEndpoint: `${API_PATH}/auth/refresh-token`,
  logoutEndpoint: `${API_PATH}/auth/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
