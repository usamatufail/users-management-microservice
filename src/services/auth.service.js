import axios from 'axios';
import { managementClient } from '../config';
import { customError, getUserObject } from '../utils';
import { URLs, bodies, ROLES_KEY } from '../constants';

// Login Service
export const loginService = async ({ email, password }) => {
  try {
    const response = await axios.post(URLs.getAuthToken, bodies.getAuthToken({ email, password }), {
      headers: { 'content-type': 'application/json' },
    });
    return {
      accessToken: response?.data?.access_token,
      refreshToken: response?.data?.refresh_token,
      idToken: response?.data?.id_token,
    };
  } catch (err) {
    throw customError(err?.response?.data?.error_description, 400);
  }
};

// Refresh Service
export const refreshService = async ({ accessToken, refreshToken }) => {
  try {
    const response = await axios.post(URLs.getAuthToken, bodies.getAuthToken({ refreshToken }), {
      headers: { 'content-type': 'application/json', 'authorization': `Bearer ${accessToken}` },
    });
    return {
      accessToken: response?.data?.access_token,
      refreshToken: response?.data?.refresh_token,
      idToken: response?.data?.id_token,
    };
  } catch (err) {
    throw customError(err?.response?.data?.error_description, 400);
  }
};

// Signup Service
export const signupService = async (data) => {
  // Signup the user
  try {
    const response = await axios.post(URLs.signupUser, bodies.signupUser(data), {
      headers: { 'content-type': 'application/json' },
    });
    if (response?.data?._id) {
      // Set Address Meta Data (Cannot Set While Signup Because Auth0 Doesn't Allow JSON Data in user_metadata while signing up user)
      // If Admin set roles
      if (data?.user?.[ROLES_KEY]?.includes('Admin')) {
        await managementClient().updateUser(
          { id: `auth0|${response?.data?._id}` },
          {
            user_metadata: { addresses: data?.addresses, roles: data?.roles },
          },
        );
      } else {
        await managementClient().updateUser(
          { id: `auth0|${response?.data?._id}` },
          {
            user_metadata: { addresses: data?.addresses },
          },
        );
      }

      // Get Auth Token
      const tokenResponse = await axios.post(
        URLs.getAuthToken,
        bodies.getAuthToken({ email: data?.email, password: data?.password }),
        {
          headers: { 'content-type': 'application/json' },
        },
      );
      return {
        accessToken: tokenResponse?.data?.access_token,
        refreshToken: tokenResponse?.data?.refresh_token,
        idToken: tokenResponse?.data?.id_token,
        user_id: `auth0|${response?.data?._id}`,
      };
    } else {
      throw customError('Cannot get Token', 400);
    }
  } catch (err) {
    if (err?.response?.data?.code === 'invalid_password') {
      throw customError(
        `${err?.response?.data?.message}. Password should be at least 8 characters long, contain at least one lower case letter, one uppercase letter, and one number or special character. `,
        400,
      );
    } else if (err?.response?.data?.code === 'invalid_signup') {
      throw customError(
        `${err?.response?.data?.description}. We are sorry that we cannot find the root cause of error but there is a possibility that an account with this email already exists in the system. Please try sending a reset password link using this email.`,
        400,
      );
    } else {
      throw customError(err?.response?.data?.error_description || err?.response?.data?.description, 400);
    }
  }
};

// Reset Password Service
export const resetPasswordService = async ({ email }) => {
  try {
    await axios.post(URLs.changePasswordRequest, bodies.changePasswordRequest({ email }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    throw customError('There is problem in sending the change password request. Please try again leter.', 400);
  }
};

// Get User Profile Service
export const getUserProfileService = async ({ id }) => {
  try {
    const res = await managementClient().getUser({ id });
    const user = getUserObject(res, false);
    return user;
  } catch (err) {
    throw customError('There is problem in getting the profile', 400);
  }
};

// Change Password Service
export const changePasswordService = async ({ id, email, currentPassword, password }) => {
  try {
    const verify = await axios.post(
      URLs.getAuthToken,
      bodies.getAuthToken({
        email,
        password: currentPassword,
      }),
      {
        headers: { 'content-type': 'application/json' },
      },
    );
    if (verify?.data?.access_token) {
      await managementClient().updateUser({ id }, { password });
      return {
        message: 'Password updated successfully',
      };
    }
  } catch (err) {
    if (err?.message === 'PasswordStrengthError: Password is too weak') {
      throw customError('Password is too weak. Please use a different new password.', 400);
    } else {
      throw customError('Failed to change password, please check your current password.', 400);
    }
  }
};

// Change Email Address Service
export const changeEmailAddressService = async ({ id, newEmail }) => {
  try {
    const res = await managementClient().updateUser({ id }, { email: newEmail });
    await managementClient().sendEmailVerification({ user_id: id });
    return res;
  } catch (err) {
    throw customError(err?.message, 400);
  }
};

// Update User Service
export const updateUserService = async ({ id, data }) => {
  try {
    const res = await managementClient().updateUser(
      { id },
      {
        name: data?.name,
        given_name: data?.given_name,
        family_name: data?.family_name,
        user_metadata: {
          gender: data?.gender,
          addresses: data?.addresses,
          birth_date: data?.birth_date,
          phone_number: data?.phone_number,
        },
      },
    );
    const user = getUserObject(res, false);
    return user;
  } catch (err) {
    throw customError(err?.message, 400);
  }
};

// Close User Account Service
export const closeAccountService = async ({ id }) => {
  try {
    const res = await managementClient().updateUser(
      { id },
      {
        user_metadata: {
          status: 'closed',
        },
      },
    );
    return res;
  } catch (err) {
    throw customError(err?.message, 400);
  }
};
