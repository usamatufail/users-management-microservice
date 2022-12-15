import { Router } from 'express';
import { analytics, protect, validate } from '../middlewares';
import { authActions } from '../constants';
import {
  changeEmailValidator,
  changePasswordValidator,
  loginValidator,
  resetPasswordValidator,
  signupValidator,
  patchUserValidator,
  putUserValidator,
  refreshValidator,
} from '../validators';
import {
  loginController,
  signupController,
  resetPasswordController,
  getUserProfileController,
  changePasswordController,
  changeEmailAddressController,
  updateUserController,
  closeAccountController,
  refreshController,
} from '../controllers';

// Creating a new router
const authRouter = Router();

authRouter.get('/profile', protect, analytics(authActions.AUTH_GETPROFILE), getUserProfileController);
authRouter.post('/', validate(loginValidator), loginController);
authRouter.post('/refresh', validate(refreshValidator), refreshController);
authRouter.post('/signup', validate(signupValidator), signupController);
authRouter.post('/reset-password', validate(resetPasswordValidator), resetPasswordController);
authRouter.post(
  '/change-password',
  validate(changePasswordValidator),
  protect,
  analytics(authActions.AUTH_CHANGEPASSWORD),
  changePasswordController,
);
authRouter.patch(
  '/change-email',
  validate(changeEmailValidator),
  protect,
  analytics(authActions.AUTH_CHANGEEMAIL),
  changeEmailAddressController,
);
authRouter.patch(
  '/update-user',
  validate(patchUserValidator),
  protect,
  analytics(authActions.AUTH_UPDATEUSER),
  updateUserController,
);
authRouter.put(
  '/update-user',
  validate(putUserValidator),
  protect,
  analytics(authActions.AUTH_UPDATEUSER),
  updateUserController,
);
// putUserValidator
authRouter.patch('/close-account', protect, analytics(authActions.AUTH_CLOSEACCOUNT), closeAccountController);

export { authRouter };
