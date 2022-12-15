import * as yup from 'yup';

// Login Validator
export const loginValidator = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  }),
});

// Refresh Validator
export const refreshValidator = yup.object().shape({
  body: yup.object().shape({
    refreshToken: yup.string().required(),
  }),
});

// Signup Validator
export const signupValidator = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
    username: yup.string().required(),
    name: yup.string().required(), // string
    given_name: yup.string().required(), // string
    family_name: yup.string().required(), // string
    gender: yup.string().required(), // string
    addresses: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          primary: yup.boolean().required(),
          city: yup.string().required(),
          state: yup.string().required(),
        }),
      )
      .required(), // array of addresses (object with city, state, country, primary, and label)
    birth_date: yup.date().required(), // string
    phone_number: yup.string().required(), // string
  }),
});

// Reset Password / Forgot Password Validator
export const resetPasswordValidator = yup.object().shape({
  body: yup.object().shape({
    email: yup.string().required().email(),
  }),
});

// Change Password Validator
export const changePasswordValidator = yup.object().shape({
  body: yup.object().shape({
    currentPassword: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  }),
});

// Change Email Validator
export const changeEmailValidator = yup.object().shape({
  body: yup.object().shape({ newEmail: yup.string().required() }),
});

// Patch User Validator
export const patchUserValidator = yup.object().shape({
  body: yup.object().shape({
    name: yup.string(), // string
    given_name: yup.string(), // string
    username: yup.string(), // string
    family_name: yup.string(), // string
    gender: yup.string(), // string
    addresses: yup.array().of(
      yup.object().shape({
        label: yup.string().required(),
        primary: yup.boolean().required(),
        city: yup.string().required(),
        state: yup.string().required(),
      }),
    ), // array of addresses (object with city, state, country, primary, and label)
    birth_date: yup.date(), // string
    phone_number: yup.string(), // string
  }),
});

// Put User Validator
export const putUserValidator = yup.object().shape({
  body: yup.object().shape({
    name: yup.string().required(), // string
    given_name: yup.string().required(), // string
    username: yup.string().required(), // string
    family_name: yup.string().required(), // string
    gender: yup.string().required(), // string
    addresses: yup.array().of(
      yup
        .object()
        .shape({
          label: yup.string().required(),
          primary: yup.boolean().required(),
          city: yup.string().required(),
          state: yup.string().required(),
        })
        .required(),
    ), // array of addresses (object with city, state, country, primary, and label)
    birth_date: yup.date().required(), // string
    phone_number: yup.string().required(), // string
  }),
});
