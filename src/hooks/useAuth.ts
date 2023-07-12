import { signInAsync } from 'expo-apple-authentication';
import { decode } from 'js-base64';
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

  const checkToken = useCallback(() => {
    try {
      const claims: unknown = JSON.parse(decode(idToken.split('.')[1]));
      if (
        claims &&
        typeof claims === 'object' &&
        'exp' in claims &&
        claims['exp'] &&
        typeof claims['exp'] === 'number'
      ) {
        const expireAt = claims['exp'] * 1000;
        const now = new Date().getTime();
        if (now < expireAt) {
          return true;
        }
      }
    } catch (err) {
      console.error(err);
    }
    return false;
  }, [idToken]);

  return {
    status,
    idToken,
    user,
    signIn,
    checkToken,
  };
};
