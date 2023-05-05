import apiClient from '../apiClient';
import { UserInfo } from '../types/UserInfo';

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await apiClient
    .post<UserInfo>(`api/users/signin`, {
      email,
      password,
    })
    .then((response) => response.data);
};

export const signUpUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return await apiClient
    .post<UserInfo>(`api/users/signup`, {
      name,
      email,
      password,
    })
    .then((response) => response.data);
};

export const updateUserProfile = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return await apiClient
    .put<UserInfo>(`api/users/profile`, {
      name,
      email,
      password,
    })
    .then((response) => response.data);
};
