import { createSlice } from '@reduxjs/toolkit';

const stepSlice = createSlice({
    name: 'currentStep',
    initialState: 0,
    reducers: {
        nextStep: state => state === 3 ? state = 3 : state + 1,
        prevStep: state => state === 1 ? state = 1 : state - 1,
        firstStep: state => state = 1
    }
})

export const { nextStep, prevStep, firstStep } = stepSlice.actions

export default stepSlice.reducer