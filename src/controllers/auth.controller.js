import expressAsyncHandler from 'express-async-handler';
import { ROLES_KEY } from '../constants';
import {
  changeEmailAddressService,
  changePasswordService,
  closeAccountService,
  getUserProfileService,
  loginService,
  refreshService,
  resetPasswordService,
  signupService,
  updateUserService,
} from '../services';

// @desc    Authenticate a user
// @route   POST /api/v1/auth
// @access  Public
export const loginController = expressAsyncHandler(async ({ body: { email, password } }, res) => {
  const data = await loginService({ email, password });
  res.status(200).json(data);
});

// @desc    Signup the user
// @route   POST /api/v1/auth/signup
// @access  Public
export const signupController = expressAsyncHandler(async ({ body, user }, res) => {
  const data = await signupService({ ...body, ...user });
  res.status(200).json(data);
});

// @desc    Refresh the Token
// @route   POST /api/v1/auth/refresh
// @access  Public
export const refreshController = expressAsyncHandler(async ({ body: { refreshToken, currentAccessToken } }, res) => {
  const data = await refreshService({ refreshToken, currentAccessToken });
  res.status(200).json(data);
});

// @desc    Send Password Reset Link
// @route   POST /api/v1/auth/reset-password
// @access  Public
export const resetPasswordController = expressAsyncHandler(async ({ body: { email } }, res) => {
  await resetPasswordService({ email });
  res.status(200).json({
    message: 'An email has been sent to your email address with a link to update password.',
  });
});

// @desc    Send User Profile
// @route   Get /api/v1/auth/profile
// @access  Private
export const getUserProfileController = expressAsyncHandler(async ({ user: { user_id } }, res) => {
  const data = await getUserProfileService({ id: user_id });
  res.status(200).json(data);
});

// @desc    Change Password for Logged In User
// @route   Get /api/v1/auth/change-password
// @access  Private
export const changePasswordController = expressAsyncHandler(
  async ({ user: { user_id, email }, body: { currentPassword, password } }, res) => {
    await changePasswordService({
      id: user_id,
      email,
      currentPassword,
      password,
    });
    res.status(200).json({ message: 'Password updated successfully.' });
  },
);

// @desc    Change Email Address and Send New Verification Link for Logged In User
// @route   Get /api/v1/auth/change-email-address
// @access  Private
export const changeEmailAddressController = expressAsyncHandler(
  async ({ user: { user_id }, body: { newEmail } }, res) => {
    const data = await changeEmailAddressService({ id: user_id, newEmail });
    res.status(200).json({
      message: `You can now login using your new email address ${data?.email}. Please note that you need to verify your new email otherwise your account status will remain un-verified.`,
    });
  },
);

// @desc    Update User Profile
// @route   PATCH & PUT /api/v1/auth/update-profile
// @access  Private
export const updateUserController = expressAsyncHandler(async ({ user: { user_id }, body }, res) => {
  const data = await updateUserService({
    id: user_id,
    data: {
      name: body?.name, // string
      given_name: body?.given_name, // string
      family_name: body?.family_name, // string
      gender: body?.gender, // string
      addresses: body?.addresses, // array of addresses (object with city, state, country, primary, and label)
      birth_date: body?.birth_date, // string
      phone_number: body?.phone_number, // string
    },
  });
  res.status(200).json({ message: 'Profile updated successfully', updated_user: data });
});

// @desc    Close User Account
// @route   PATCH /api/v1/auth/close-account
// @access  Private
export const closeAccountController = expressAsyncHandler(async ({ user: { user_id } }, res) => {
  await closeAccountService({ id: user_id });
  res.status(200).json({ message: `User's account closed successfully` });
});
