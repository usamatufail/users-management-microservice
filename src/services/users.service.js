import { getUserObject, customError } from '../utils';
import { managementClient } from '../config';
import { Analytics } from '../models';

// Get User by ID
export const getUserByIdService = async ({ id }) => {
  try {
    const res = await managementClient().getUser({ id });
    return res;
  } catch (err) {
    throw customError('Error getting user', 400);
  }
};

// Delete User by ID
export const deleteUserByIdService = async ({ id }) => {
  try {
    const res = await managementClient().updateUserMetadata({ id }, { status: 'closed' });
    return res;
  } catch (err) {
    throw customError('Error deleting user', 400);
  }
};

// Get All Users
export const getAllUsersService = async ({ limit, offset }) => {
  try {
    const res = await managementClient().getUsers({ per_page: limit });
    if (offset !== undefined) {
      // Get Results After a specific offset
      const resultWithOffset = res?.filter((user, index) => index >= offset);
      return resultWithOffset;
    } else {
      return res;
    }
  } catch (err) {
    throw customError('Error getting users', 400);
  }
};

// Get Analytics
export const getAnalyticsService = async ({ limit, offset, user_id, action_type }) => {
  const query = user_id
    ? { requestUserId: user_id }
    : action_type
    ? { action: action_type }
    : user_id && action_type
    ? { action: action_type, requestUserId: user_id }
    : {};
  try {
    const res = await Analytics.find(query).limit(limit).skip(offset);
    return res;
  } catch (err) {
    throw customError('Error getting analytics', 400);
  }
};

// Update User By Admin Service
export const updateUserByAdminService = async ({ id, data }) => {
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
        app_metadata: {
          roles: data?.roles,
        },
      },
    );
    const user = getUserObject(res, true);
    return user;
  } catch (err) {
    throw customError(err?.message, 400);
  }
};
