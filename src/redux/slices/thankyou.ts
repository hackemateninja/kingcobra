// Packages
import { createSlice } from '@reduxjs/toolkit';

// Definitions
import { IStateThankyou } from '@/def/IStateThankyou';

// Initial state
const initialThankyou: IStateThankyou = {
  data: {
    make: {},
    model: {},
    zipcode: '',
    selectedMakes: [],
  },
  ui: {
    buttonClick: false,
  },
};

const thankyouSlice = createSlice({
  name: 'thankyou',
  initialState: initialThankyou,
  reducers: {
    setSelectedMakeTYP: (state, action) => {
      state.data.make = action.payload;
    },
    setSelectedModelTYP: (state, action) => {
      state.data.model = action.payload;
    },
    setZipCodeTYP: (state, action) => {
      state.data.zipcode = action.payload;
    },
    setSelectedMakes: (state, action) => {
      state.data.selectedMakes = action.payload;
    },
    setButtonClick: (state, action) => {
      state.ui.buttonClick = action.payload;
    },
  },
});

export const {
  setSelectedMakeTYP,
  setSelectedModelTYP,
  setZipCodeTYP,
  setSelectedMakes,
  setButtonClick,
} = thankyouSlice.actions;

export default thankyouSlice.reducer;
