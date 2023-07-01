import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { object, string } from 'zod';
import { schemaForType } from '../../utils/schema';
import { RootState } from '../store';

const ASYNC_STORAGE_KEY_AUTH = 'AUTH';

interface AuthState {
  status: 'uninitialized' | 'loading' | 'loaded';
  idToken: string;
  user: string;
}

type SavedAuth = Pick<AuthState, 'idToken' | 'user'>;

const initialState: AuthState = {
  status: 'uninitialized',
  idToken: '',
  user: '',
};

export const load = createAsyncThunk(
  'auth/load',
  async (): Promise<AuthState> => {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY_AUTH);
    try {
      const obj = Auth.parse(JSON.parse(value ?? ''));
      console.log(`load from asyncStorage`, obj);
      return {
        ...obj,
        status: 'loaded',
      };
    } catch (err) {
      // ignore error
      console.log('could not load auth info', err);
      return {
        ...initialState,
        status: 'loaded',
      };
    }
  }
);

export const save = createAsyncThunk('auth/save', async (auth: SavedAuth) => {
  await saveAuth(auth);
  return auth;
});

export const reset = createAsyncThunk('auth/reset', async () => {
  await saveAuth({
    idToken: '',
    user: '',
  });
  return initialState;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(load.fulfilled, (_, action) => {
      return action.payload;
    });
    builder.addCase(save.fulfilled, (state, action) => {
      state.idToken = action.payload.idToken;
      state.user = action.payload.user;
    });
  },
});

// export const { load } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

const saveAuth = async (auth: SavedAuth) => {
  await AsyncStorage.setItem(ASYNC_STORAGE_KEY_AUTH, JSON.stringify(auth));
};

const Auth = schemaForType<SavedAuth>()(
  object({
    idToken: string(),
    user: string(),
  })
);
