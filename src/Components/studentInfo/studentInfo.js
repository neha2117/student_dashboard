import React from "react";
import { connect } from "react-redux";
import {getParticularStudentInfo} from "../../Actions/studentDataAction";

const mapStateToProps = (store) => {
    return{
        studentInfo: store.student.particularStudentInfo
    }
}
class StudentData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentInfo: {}
        }
    }

    componentDidMount() {
        if(this.props.location && this.props.location.state && this.props.location.state.studentInfo) {
            this.props.dispatch(getParticularStudentInfo(this.props.location.state.studentInfo.rollNo))
        }

    }

    render() {
        return(
            <div>
                StudentData
            </div>
        )
    }
}

export default connect(mapStateToProps)(StudentData);