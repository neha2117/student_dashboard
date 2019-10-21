export default function reducer(state={
    studentData : {},
    particularStudentInfo : {}
}, action) {
    switch(action.type) {
        case "STUDENT_DATA":
            return {...state, studentData: action.payload }
        case "PARTICULAR_STUDENT_INFO":
            var data = state.studentData
            console.log("data", data, action.payload)
            return {...state, particularStudentInfo: state.studentData[action.payload]}
        default : {}
    }

    return state;
}