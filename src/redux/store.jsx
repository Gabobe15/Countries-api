import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/countrySlice';
import userSlice from './features/countrySlice';
// import logger from 'redux-logger';

const rootReducer = {
	user: userSlice,
	country: countryReducer,
};

export const store = configureStore({
	reducer: rootReducer,
	// reducer: {
	// 	country: countryReducer,
	// },
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
