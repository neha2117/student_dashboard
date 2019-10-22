export default function reducer(state={
    studentData : {},
    particularStudentInfo : {}
}, action) {
    switch(action.type) {
        case "STUDENT_DATA":
            return {...state, studentData: action.payload }
        case "PARTICULAR_STUDENT_INFO":
            return {...state, particularStudentInfo: state.studentData.data[action.payload]}
        default : {}
    }

    return state;
}