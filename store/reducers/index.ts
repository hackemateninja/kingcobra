import { combineReducers } from 'redux';

import quoteSlice from '../slices/quotes';
import dealersSlice from '../slices/dealers';
import formSlice from '../slices/form';
import testSlice from '../slices/testSlice';
import monthSlice from '../slices/month';

const rootReducer = combineReducers({
	quotesData: quoteSlice,
	dealersData: dealersSlice,
	formData: formSlice,
	testData: testSlice,
	monthData: monthSlice
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;