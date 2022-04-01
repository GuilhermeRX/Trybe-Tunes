export const USER_INFO = 'USER_INFO';

export function userAction(userName) {
  return {
    type: USER_INFO,
    userName,
  };
}
