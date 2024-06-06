// store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';
import { assignmentsReducer } from './assignmentRelated/assignmentsReducers'; // Make sure to export assignmentsReducer

const rootReducer = combineReducers({
    user: userReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
    complain: complainReducer,
    sclass: sclassReducer,
    assignments: assignmentsReducer, // Add assignments reducer here
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
