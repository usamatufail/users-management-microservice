//

import { Router } from 'express';
import { analytics, minRequiredPermission, protect, validate } from '../middlewares';
import { ROLES, usersActions } from '../constants';
import {
  getUserByIdController,
  getAllUsersController,
  deleteUserByIdController,
  getAnalyticsController,
  updateUserByAdminController,
} from '../controllers';
import { patchUserByAdminValidator, putUserByAdminValidator, userIdValidator } from '../validators';

const usersRouter = Router();

usersRouter.get('/analytics-report', protect, minRequiredPermission(ROLES.ADMIN), analytics(usersActions.USERS_GETANALYTICS), getAnalyticsController);
usersRouter.get('/', protect, minRequiredPermission(ROLES.ADMIN), analytics(usersActions.USERS_GETALLUSERS), getAllUsersController);
usersRouter
  .route('/:id')
  .get(protect, minRequiredPermission(ROLES.ADMIN), validate(userIdValidator), analytics(usersActions.USERS_GETPROFILE), getUserByIdController)
  .delete(protect, minRequiredPermission(ROLES.ADMIN), validate(userIdValidator), analytics(usersActions.USERS_DELETEUSER), deleteUserByIdController)
  .put(
    protect,
    minRequiredPermission(ROLES.ADMIN),
    validate(userIdValidator),
    validate(putUserByAdminValidator),
    analytics(usersActions.USERS_UPDATEUSER),
    updateUserByAdminController,
  )
  .patch(
    protect,
    minRequiredPermission(ROLES.ADMIN),
    validate(userIdValidator),
    validate(patchUserByAdminValidator),
    analytics(usersActions.USERS_UPDATEUSER),
    updateUserByAdminController,
  );

export { usersRouter };
