// assignmentsReducers

export const assignmentsReducer = (state = { assignments: [] }, action) => {
    switch (action.type) {
        case 'ASSIGNMENTS_REQUEST':
            return { loading: true };
        case 'ASSIGNMENTS_SUCCESS':
            return { loading: false, assignments: action.payload };
        case 'ASSIGNMENTS_FAIL':
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
