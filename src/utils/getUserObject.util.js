export const getUserObject = (auth0User, isAdmin) => {
  return {
    email: auth0User?.email,
    name: auth0User?.name,
    given_name: auth0User?.given_name,
    family_name: auth0User?.family_name,
    nickname: auth0User?.nickname,
    roles: auth0User?.app_metadata?.roles,
    id: auth0User?.user_id,
    username: auth0User?.username,
    gender: auth0User?.user_metadata?.gender,
    birth_date: auth0User?.user_metadata?.birth_date,
    picture: auth0User?.picture,
    addresses: auth0User?.user_metadata?.addresses,
    status: auth0User?.user_metadata?.status,
    phone_number: auth0User?.user_metadata?.phone_number,
    created_at: auth0User?.created_at,
    updated_at: auth0User?.updated_at,
    username: auth0User?.username,
    roles: isAdmin ? auth0User?.app_metadata?.roles : 'Not Authorized to see or edit roles',
  };
};
