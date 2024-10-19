import request from "umi-request";

export async function login(user: API.User) {
  return request('/pc/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(user),
  });
}