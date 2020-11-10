import { createSlice } from '@reduxjs/toolkit';

import { testimonialsList } from '../../src/data/testimonials';

const randomQuotes = () => {
	const shuffledQuotes = testimonialsList.sort( () => 0.5 - Math.random() );
	let quotesList = shuffledQuotes.slice( 0, 3 )
	
	return quotesList;
};

const quoteSlice = createSlice({
	name: 'quotesData',
	initialState: [],
	reducers: {
		setQuotes: state => state = randomQuotes()
	}
})

export const { setQuotes } = quoteSlice.actions

export default quoteSlice.reducer