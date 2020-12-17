// Packages
import { createSlice } from '@reduxjs/toolkit';

// Definitions
import { IStateSite } from '@/def/IStateSite';

// Utilities
import getMonth from '@/util/get-month';
import getYear from '@/util/get-year';
import randomizer from '@/util/random-quotes';

// Initial state
const initialSite: IStateSite = {
	month: '',
	year: 2020,
	quotes: []
};

const siteSlice = createSlice({
	name: 'site',
	initialState: initialSite,
	reducers: {
		setMonth: ( state: IStateSite ) => { state.month = getMonth() },
		setYear: ( state: IStateSite ) => { state.year = getYear() },
		setQuotes: ( state: IStateSite ) => { state.quotes = randomizer() }
	}
});

export const { setMonth, setYear, setQuotes } = siteSlice.actions;

export default siteSlice.reducer