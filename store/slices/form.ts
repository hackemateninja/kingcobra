import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface initialStateType {
    make: string,
    model: string,
    zip: string,
    image: string,
    dealers: []
    first: string,
    last: string,
    phone: string,
    address: string,
    email: string
}

const initialState: initialStateType = {
    make: '',
    model: '',
    zip: '',
    image: '/hero-image.webp',
    dealers: [],
    first: '',
    last: '',
    phone: '',
    address: '',
    email: '',
}

const formSlice = createSlice({
    name: 'formData',
    initialState: initialState,
    reducers: {
        saveMake: (state, action) => { state.make = action.payload },
        saveModel: (state, action) => { state.model = action.payload },
        saveZip: (state, action) => { state.zip = action.payload },
        saveImg: (state, action) => { state.image = action.payload },
        saveFirst: (state, action) => { state.first = action.payload },
        saveLast: (state, action) => { state.last = action.payload },
        saveAddress: (state, action) => { state.address = action.payload },
        savePhone: (state, action) => { state.phone = action.payload },
        saveEmail: (state, action) => { state.email = action.payload },
        saveDealers: (state, action) => { state.dealers = action.payload }
    }
});

export const {
    saveMake,
    saveModel,
    saveZip,
    saveImg,
    saveFirst,
    saveLast,
    saveAddress,
    savePhone,
    saveEmail,
    saveDealers
} = formSlice.actions

export default formSlice.reducer