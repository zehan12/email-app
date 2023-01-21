import { createSlice } from '@reduxjs/toolkit';


export const EmailSlice = createSlice({
    name: 'emailSlice',
    initialState: {
        email: [],
        currentEmail: null,
        filter: 'all',
    },
    reducers: {
        setEmail: (state, actions) => {
            console.log(state,actions)
            state.email = actions.payload;
        }

    },
});

// Action creators are generated for each case reducer function
export const {
    setEmail,
} = EmailSlice.actions

export default EmailSlice.reducer