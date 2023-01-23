import { createSlice } from '@reduxjs/toolkit';


export const EmailSlice = createSlice({
    name: 'emailSlice',
    initialState: {
        email: [],
        currentEmail: null,
        filter: 'All',
    },
    reducers: {
        setEmail: (state, actions) => {
            console.log(state, actions.payload)
            actions.payload.list.map((item) => (
                item.favorite = false,
                item.read = false
            ))
            state.email = actions.payload;
        },

        setRead: ( state, actions ) => {
            console.log(actions,"value")
        },
        setFilters: (state, actions) => {
            state.filter = actions.payload
        }
    },
});

// Action creators are generated for each case reducer function
export const {
    setEmail,
    setRead,
    setFilters
} = EmailSlice.actions

export default EmailSlice.reducer