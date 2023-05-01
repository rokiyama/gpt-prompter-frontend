import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from 'expo-constants';
import { array, object, record, string } from 'zod';
import { SystemMessage } from '../../types/externalData';
import { schemaForType } from '../../utils/schema';
import { RootState } from '../store';

interface ExternalDataState {
  systemMessages: Record<string, Array<SystemMessage>>;
}

const initialState: ExternalDataState = {
  systemMessages: {},
};

export const loadSystemMessages = createAsyncThunk(
  'externalData/systemMessages',
  async () => {
    try {
      const res = await axios.get(
        Constants.expoConfig?.extra?.systemMessagesUrl
      );
      const parsed = ExternalData.parse(res.data);
      console.log('ExternalData', parsed);
      return parsed;
    } catch (err) {
      console.error('loadSystemMessages error', err);
    }
    return initialState;
  }
);

export const externalDataSlice = createSlice({
  name: 'externalData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadSystemMessages.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    });
  },
});

export const selectSystemMessages = (state: RootState) =>
  state.externalData.systemMessages;

const ExternalData = schemaForType<ExternalDataState>()(
  object({
    systemMessages: record(
      array(
        object({
          id: string(),
          text: string(),
        })
      )
    ),
  })
);
