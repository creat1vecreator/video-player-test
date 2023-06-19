import { configureStore } from '@reduxjs/toolkit';

const customMiddleWare = {
  serializableCheck: false,
};
const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(customMiddleWare),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
