import { combineReducers } from 'redux';
import student from './studentInfoReducer';

const appReducer = combineReducers({
    student
})

const rootReducer = ( state, action ) => {
    return appReducer(state, action)
}

export default rootReducer;