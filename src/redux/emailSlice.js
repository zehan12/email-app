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
            actions.payload.list.map((item) => (
                item.favorite = false,
                item.read = false
            ))
            state.email = actions.payload;
        },

        setRead: (state, actions) => {
            // console.log(state.email.list)
            let cloned = { ...actions.payload.email }
            cloned.list.map((item) => {
                if (actions.payload.id == item.id) {
                    item.read = true
                }
            });
            state.email = cloned
        },
        setFilters: (state, actions) => {
            state.filter = actions.payload
        },

        setFavorite: (state, actions) => {
            let cloned = { ...actions.payload.email }
            cloned.list.map((item) => {
                if (actions.payload.id == item.id) {
                    item.favorite = true
                }
            });
            state.email = cloned
        },
        setUnFavorite: (state, actions) => {
            let cloned = { ...actions.payload.email }
            cloned.list.map((item) => {
                if (actions.payload.id == item.id) {
                    item.favorite = false
                }
            });
            state.email = cloned
        }

    },
});

// Action creators are generated for each case reducer function
export const {
    setEmail,
    setRead,
    setFilters,
    setFavorite,
    setUnFavorite
} = EmailSlice.actions

export default EmailSlice.reducer