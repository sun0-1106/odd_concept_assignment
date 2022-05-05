import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState, EXPRATION_TIME } from '../common/common';
import { getProductsData } from '../../api/service';

const PRODUCT_REDUCER_NAME = 'products';

export const fetchProducts = createAsyncThunk('productsData', async () => {
  const response = await getProductsData();
  return { data: response, isLoading: false, isError: false };
});

export const productsSlice = createSlice({
  name: PRODUCT_REDUCER_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = action.payload.isLoading;
      state.isError = action.payload.isError;
      localStorage.setItem(
        PRODUCT_REDUCER_NAME,
        JSON.stringify({
          state,
          expiredAt: Date.now() + EXPRATION_TIME,
        }),
      );
    });
    builder.addCase(fetchProducts.rejected, state => {
      state.data = null;
      state.isLoading = false;
      state.isError = true;
      localStorage.removeItem(PRODUCT_REDUCER_NAME);
    });
  },
});

export const { getProducts } = productsSlice.actions;

export default productsSlice;
