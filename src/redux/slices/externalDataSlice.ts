import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Constants from 'expo-constants';
import { array, boolean, object, record, string } from 'zod';
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
  description: string;
  variables: Record<string, string>;
  author: string;
  source: string;
};

export type CommandCategory = {
  id: string;
  title: string;
  first: boolean;
  data: Array<Command>;
};

interface ExternalsState {
  data: {
    systemMessages: Record<string, Array<SystemMessage>>;
    commands: Record<string, Array<CommandCategory>>;
  };
  loading: boolean;
}

const initialState: ExternalsState = {
  data: {
    systemMessages: {},
    commands: {},
  },
  loading: false,
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
      return initialState.data;
    }
  }
);

export const externalDataSlice = createSlice({
  name: 'externalData',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadExternalData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
  },
});

export const { setLoading } = externalDataSlice.actions;

export const selectSystemMessages = (state: RootState) =>
  state.externalData.data.systemMessages;
export const selectCommands = (state: RootState) =>
  state.externalData.data.commands;
export const selectLoading = (state: RootState) => state.externalData.loading;

const ExternalData = schemaForType<ExternalsState['data']>()(
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
          first: boolean(),
          data: array(
            object({
              id: string(),
              title: string(),
              template: string(),
              description: string(),
              variables: record(string()),
              author: string(),
              source: string(),
            })
          ),
        })
      )
    ),
  })
);
