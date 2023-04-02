import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocales } from 'expo-localization';
import { SYSTEM_MESSAGES_URL } from '../../constants';
import { isSystemMessage, SystemMessage } from '../../types/externalData';
import { RootState } from '../store';

interface ExternalDataState {
  systemMessages: Array<SystemMessage>;
}

const initialState: ExternalDataState = {
  systemMessages: [],
};

export const loadSystemMessages = createAsyncThunk(
  'externalData/systemMessages',
  async () => {
    console.log('loading', SYSTEM_MESSAGES_URL);
    try {
      const locales = getLocales()[0];
      const res = await axios.get(SYSTEM_MESSAGES_URL);
      const arr =
        res.data && locales.languageCode === 'ja' ? res.data.ja : res.data.en;
      if (arr && Array.isArray(arr) && arr.every(isSystemMessage)) {
        return arr;
      }
    } catch (err) {
      console.error('loadSystemMessages error', err);
    }
  }
);

export const externalDataSlice = createSlice({
  name: 'externalData',
  initialState,
  reducers: {
    setSystemMessages: (state, action: PayloadAction<Array<SystemMessage>>) => {
      state.systemMessages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSystemMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.systemMessages = action.payload;
      }
    });
  },
});

export const { setSystemMessages } = externalDataSlice.actions;

export const selectSystemMessages = (state: RootState) =>
  state.externalData.systemMessages;

// export default externalDataSlice.reducer;
