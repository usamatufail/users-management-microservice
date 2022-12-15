import auth0 from 'auth0';
import dotenv from 'dotenv';
dotenv.config();

export const managementClient = () => {
  const management = new auth0.ManagementClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    scope: 'read:users update:users create:users create:users_app_metadata delete:users delete:users_app_metadata create:user_tickets',
  });

  return management;
};

export const authClient = () => {
  const auth = new auth0.AuthenticationClient({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    __bypassIdTokenValidation: true,
    scope: 'read:users update:users create:users create:users_app_metadata delete:users delete:users_app_metadata',
  });

  return auth;
};
