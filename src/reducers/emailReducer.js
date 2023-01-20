export const initialState = {
    value:""
}

export default function stateReducer(state=initialState,action) {
    switch ( action.type ) {
        default:
            return state;
    }
}