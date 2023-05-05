import { useMutation } from '@tanstack/react-query';
import { signInUser, signUpUser, updateUserProfile } from '../services/user';

export const useSignInMutation = () =>
  useMutation({
    mutationFn: signInUser,
  });

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpUser,
  });

export const useUpdateUserProfileMutation = () =>
  useMutation({
    mutationFn: updateUserProfile,
  });
