import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  count: number;
}

const initialState: UserState = {
  count: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.count++;
    },
  },
});

export const { increment } = userSlice.actions;

export const selectCount = (state: RootState) => state.user.count;

export default userSlice.reducer;
