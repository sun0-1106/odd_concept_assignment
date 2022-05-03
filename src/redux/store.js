import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './clothes/productsSlice';
import regionSlice from './clothes/regionsSlice';

const getCachedData = key => {
  const raw = localStorage.getItem(key);
  const data = raw && JSON.parse(raw);

  if (!data || data?.expiredAt <= Date.now()) {
    return undefined;
  }
  return { [key]: data.state };
};

const createStore = () => {
  return configureStore({
    preloadedState: {
      ...getCachedData(productsSlice.name),
      ...getCachedData(regionSlice.name),
    },
    reducer: {
      [productsSlice.name]: productsSlice.reducer,
      [regionSlice.name]: regionSlice.reducer,
    },
    devTools: true,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export default createStore();
