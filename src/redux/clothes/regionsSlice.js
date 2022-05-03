import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState, EXPRATION_TIME } from '../common/common';
import { getRegionsData } from '../../api/service';

const REGION_REDUCER_NAME = 'regions';

export const fetchRegions = createAsyncThunk('regionsData', async () => {
  const response = await getRegionsData();
  return { data: response, isLoading: false, isError: false };
});

export const regionsSlice = createSlice({
  name: REGION_REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRegions.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      localStorage.setItem(
        REGION_REDUCER_NAME,
        JSON.stringify({
          state,
          expiredAt: Date.now() + EXPRATION_TIME,
        }),
      );
    });
    builder.addCase(fetchRegions.rejected, state => {
      state.data = null;
      state.isLoading = false;
      state.isError = true;
      localStorage.removeItem(REGION_REDUCER_NAME);
    });
  },
});

export const { getRegions } = regionsSlice.actions;

export default regionsSlice;
