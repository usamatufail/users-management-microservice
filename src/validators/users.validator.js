import yup from 'yup';

// User Id validator
export const userIdValidator = yup.object().shape({
  params: yup.object().shape({
    id: yup.string().trim().required(),
  }),
});

// Patch User Validator
export const patchUserByAdminValidator = yup.object().shape({
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
    roles: yup.array().of(yup.string()), // array of string
  }),
});

// Put User Validator
export const putUserByAdminValidator = yup.object().shape({
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
    roles: yup.array().of(yup.string()).required(), // array of string
  }),
});
