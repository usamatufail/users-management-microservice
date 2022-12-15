import expressAsyncHandler from 'express-async-handler';
import { getUserByIdService, getAllUsersService, deleteUserByIdService, getAnalyticsService } from '../services';

// @desc    Get User by ID
// @route   GET /api/v1/users/:id
// @access  Private
// @role    ADMIN
export const getUserByIdController = expressAsyncHandler(async ({ params: { id } }, res) => {
  const response = await getUserByIdService({ id });
  res.status(200).json(response);
});

// @desc    Delete User by ID
// @route   DELETE /api/v1/users/:id
// @access  Private
// @role    ADMIN
export const deleteUserByIdController = expressAsyncHandler(async ({ params: { id } }, res) => {
  await deleteUserByIdService({ id });
  res.status(200).json({ message: 'Account closed/deleted successfully' });
});

// @desc    Get All Users In The System
// @route   GET /api/v1/users
// @access  Private
// @role    ADMIN
export const getAllUsersController = expressAsyncHandler(async (req, res) => {
  const response = await getAllUsersService({ limit: req?.query?.limit, offset: req?.query?.offset });
  res.status(200).json(response);
});

// @desc    Get Analytics
// @route   GET /api/v1/users/analytics-report
// @access  Private
// @role    ADMIN
export const getAnalyticsController = expressAsyncHandler(async (req, res) => {
  const response = await getAnalyticsService({
    limit: req?.query?.limit,
    offset: req?.query?.offset,
    user_id: req?.query?.user_id,
    action_type: req?.query?.action_type,
  });
  res.status(200).json(response);
});

// @desc    Update User Profile
// @route   PATCH & PUT /api/v1/users/:id
// @access  Private
export const updateUserByAdminController = expressAsyncHandler(async ({ params: { id } }, res) => {
  const data = await updateUserService({
    id,
    data: {
      name: body?.name, // string
      given_name: body?.given_name, // string
      family_name: body?.family_name, // string
      gender: body?.gender, // string
      addresses: body?.addresses, // array of addresses (object with city, state, country, primary, and label)
      birth_date: body?.birth_date, // string
      phone_number: body?.phone_number, // string
      roles: body?.roles,
    },
  });
  res.status(200).json({ message: 'Profile updated successfully', updated_user: data });
});
