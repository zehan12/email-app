import { createSlice } from '@reduxjs/toolkit';

export const PageSlice = createSlice({
    name: 'pageSlice',
    initialState: {
        page: 1,
        totalPage:2,
    },
    reducers: {
        changePage: (state, actions) => {
            state.page = state.page === 1 ? 2 : 1;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    changePage,
} = PageSlice.actions

export default PageSlice.reducer