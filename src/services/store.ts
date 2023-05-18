import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
  MiddlewareArray,
} from "@reduxjs/toolkit";

import { Middleware } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";

import { PlatformGetApi } from "api/backend";
import platform from "pages/platform/services/platform.store";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  [PlatformGetApi.reducerPath]: PlatformGetApi.reducer,
  platform,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Middleware[] = [...new MiddlewareArray<Middleware[]>()];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...middlewares,

    PlatformGetApi.middleware,
  ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
