import { createSlice } from '@reduxjs/toolkit';

const getMonth = () => {
	const date = new Date();

	switch( date.getMonth() ) {
		case 0: return 'January';
		case 1: return 'February';
		case 2: return 'March';
		case 3: return 'April';
		case 4: return 'May';
		case 5: return 'June';
		case 6: return 'July';
		case 7: return 'August';
		case 8: return 'September';
		case 9: return 'October';
		case 10: return 'November';
		case 11: return 'December';
	}
};

const monthSlice = createSlice({
	name: 'monthData',
	initialState: '',
	reducers: {
		setMonth: state => state = getMonth()
	}
})

export const { setMonth } = monthSlice.actions

export default monthSlice.reducer