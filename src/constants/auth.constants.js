import dotenv from 'dotenv';

dotenv.config();

export const authActions = {
  AUTH_GETPROFILE: 'auth.getProfile',
  AUTH_CHANGEPASSWORD: 'auth.changePassword',
  AUTH_CHANGEEMAIL: 'auth.changeEmailAddress',
  AUTH_UPDATEUSER: 'auth.updateUser',
  AUTH_CLOSEACCOUNT: 'auth.closeAccount',
}


export const ROLES_KEY = `${process.env.AUTH_AUDIENCE}/roles`;
export const ROLES = {
  ADMIN: 'Admin',
  SUPPLIER: 'Supplier',
  CUSTOMER: 'Customer',
};

export const URLs = {
  // Get Auth Token Endpoint URL for Authentication
  getAuthToken: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
  // Signup Endpoint for Registering a new User
  signupUser: `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`,
  // Get User Info Using Access Token
  getUserInfo: `https://${process.env.AUTH0_DOMAIN}/userInfo`,
  // Change Password
  changePasswordRequest: `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
};

export const bodies = {
  // Get Auth Token Endpoint Body
  getAuthToken: ({ email, password, refreshToken }) => {
    if (!refreshToken && email && password) {
      return JSON.stringify({
        grant_type: 'password',
        username: email,
        password,
        audience: process.env.AUTH_AUDIENCE,
        scope: process.env.AUTH_SCOPE,
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
      });
    } else {
      return JSON.stringify({
        grant_type: 'refresh_token',
        scope: process.env.AUTH_SCOPE,
        refresh_token: refreshToken,
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
      });
    }
  },
  // Signup Ednpoint Body
  signupUser: ({
    email,
    password,
    username,
    name,
    given_name,
    family_name,
    nickname,
    gender,
    birth_date,
    phone_number,
  }) =>
    JSON.stringify({
      email,
      password,
      username,
      name,
      given_name,
      family_name,
      nickname,
      user_metadata: {
        status: 'active',
        gender: gender,
        birth_date: birth_date,
        phone_number: phone_number,
      },
      connection: process.env.AUTH0_CONNECTION,
      client_id: process.env.AUTH_CLIENT_ID,
    }),
  // Change Password Body
  changePasswordRequest: ({ email }) =>
    JSON.stringify({
      client_id: process.env.AUTH_CLIENT_ID,
      email,
      connection: process.env.AUTH0_CONNECTION,
    }),
};
