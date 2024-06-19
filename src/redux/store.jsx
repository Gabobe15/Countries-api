import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './features/countrySlice';
// import logger from 'redux-logger';

export const store = configureStore({
	reducer: {
		country: countryReducer,
	},
	//middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
