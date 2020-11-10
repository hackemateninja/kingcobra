import { createSlice } from '@reduxjs/toolkit';

const dealers = [
	{id: '142691_1', name: 'Midway Ford', address: '8155 W Flagler St, Miami, FL'},
	// {id: '130649_2', name: 'Palmetto Truck Center', address: '7245 N W 36th St, Miami, FL'},
	// {id: '130649_3', name: 'Metro Ford Inc', address: '9000 Nw 7th Ave, Miami, FL'}
]

const initialState = {
	list: dealers,
	selected: []
};

const dealersSlice = createSlice({
	name: 'dealersData',
	initialState: initialState,
	reducers: {
		setSelected: ( state, action ) => {
			const payload = action.payload;
			state.selected = payload
		}
	}
})

export const { setSelected } = dealersSlice.actions

export default dealersSlice.reducer