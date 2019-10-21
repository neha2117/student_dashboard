import axios from 'axios';


export function getAllStudents(dispatch) {
    return axios.get("https://api.myjson.com/bins/1dlper")
        .then((response) => {
            dispatch({
                type: "STUDENT_DATA",
                payload: response
            })
        })
}

export function getParticularStudentInfo(id) {
    return function(dispatch) {
        dispatch({
            type: "PARTICULAR_STUDENT_INFO",
            payload: id
        })
    }
}