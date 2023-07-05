import { signInAsync } from 'expo-apple-authentication';
import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { load, save, selectAuth } from '../redux/slices/authSlice';

export const useAuth = (onSignIn?: () => void) => {
  const dispatch = useAppDispatch();
  const { status, idToken, user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (status === 'uninitialized') {
      dispatch(load());
    }
  }, [status, dispatch]);

  const signIn = useCallback(async () => {
    try {
      const credential = await signInAsync();

      if (credential.identityToken) {
        dispatch(
          save({
            idToken: credential.identityToken,
            user: credential.user,
          })
        );
        onSignIn?.();
      }
    } catch (e) {
      if (
        e &&
        typeof e === 'object' &&
        'code' in e &&
        e.code === 'ERR_REQUEST_CANCELED'
      ) {
        // handle that the user canceled the sign-in flow
        console.log('login canceled');
      } else {
        // handle other errors
        console.error('🤔 Unknown error', e);
      }
    }
  }, [dispatch, onSignIn]);

  return {
    status,
    idToken,
    user,
    signIn,
  };
};
