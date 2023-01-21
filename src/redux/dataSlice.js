import { createSlice } from '@reduxjs/toolkit';

export const DataSlice = createSlice({
    name: 'dataSlice',
    initialState: {
        message: 'Hello World',
    },
    reducers: {
        updateMessage: (state, actions) => {
            state.message = actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    updateMessage,
} = DataSlice.actions

export default DataSlice.reducer