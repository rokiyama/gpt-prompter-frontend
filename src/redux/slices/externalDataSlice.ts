import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from 'expo-constants';
import { array, object, record, string } from 'zod';
import { schemaForType } from '../../utils/schema';
import { RootState } from '../store';

export type SystemMessage = {
  id: string;
  text: string;
};

export type Command = {
  id: string;
  title: string;
  template: string;
  variables: Record<string, string>;
  author: string;
  source: string;
};

interface ExternalDataState {
  systemMessages: Record<string, Array<SystemMessage>>;
  commands: Record<string, Array<Command>>;
}

const initialState: ExternalDataState = {
  systemMessages: {},
  commands: {},
};

export const loadExternalData = createAsyncThunk(
  'externalData/load',
  async () => {
    try {
      const res = await axios.get(
        Constants.expoConfig?.extra?.systemMessagesUrl
      );
      const parsed = ExternalData.parse(res.data);
      console.log('ExternalData', parsed);
      return parsed;
    } catch (err) {
      console.error('loadExternalData error', err);
      return initialState;
    }
  }
);

export const externalDataSlice = createSlice({
  name: 'externalData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadExternalData.fulfilled, (state, action) => {
      if (action.payload) {
        return action.payload;
      }
    });
  },
});

export const selectSystemMessages = (state: RootState) =>
  state.externalData.systemMessages;
export const selectCommands = (state: RootState) => state.externalData.commands;

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
    commands: record(
      array(
        object({
          id: string(),
          title: string(),
          template: string(),
          variables: record(string()),
          author: string(),
          source: string(),
        })
      )
    ),
  })
);
