// Assignment actions

import axios from 'axios';

export const fetchAssignments = (studentID) => async (dispatch) => {
    try {
        dispatch({ type: 'ASSIGNMENTS_REQUEST' });
        const { data } = await axios.get(`http://localhost:5000/api/assignments/${studentID}`);
        dispatch({ type: 'ASSIGNMENTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'ASSIGNMENTS_FAIL', payload: error.response && error.response.data.message ? error.response.data.message : error.message });
    }
};
