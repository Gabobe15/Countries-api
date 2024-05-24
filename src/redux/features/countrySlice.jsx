import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const initialState = {
// 	country: [],
// 	isLoading: false,
// 	error: null,
// };

// const url = `https://restcountries.com/v3.1/all`;

export const getCountry = createAsyncThunk('country/getCountry', async () => {
	const response = await axios.get('https://restcountries.com/v3.1/all');
	return response.data;
});

const countrySlice = createSlice({
	name: 'country',
	initialState: {
		country: [],
		loading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder.addCase(getCountry.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getCountry.fulfilled, (state, action) => {
			state.loading = false;
			state.country = action.payload;
		});
		builder.addCase(getCountry.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		});
	},
});

export default countrySlice.reducer;
