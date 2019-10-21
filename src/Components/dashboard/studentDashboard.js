import React from "react";
import "./studentDashboard.css";
import { getAllStudents } from "../../Actions/studentDataAction";
import { connect } from "react-redux";
import Loader from "../../images/Loader.svg";

const mapStateToProps = store => {
    return {
        studentData: store.student.studentData
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            studentData: {},
            loader: true
        }
    }

    componentDidMount() {
        this.props.dispatch(getAllStudents)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.studentData && nextProps.studentData.length !== 0) {
            this.setState({
                loader: false,
                studentData: nextProps.studentData.data
            }, () => {
                console.log(this.state.studentData[110].name)
            })
        }
    }

    getTheStudentData(values)  {
        console.log("value", values)
        var studentInfo = Object.assign({}, values)
        var rollNo = studentInfo[rollNo]
        this.props.history.push({
            pathname: `/dashboard/${studentInfo.rollNo}`,
            state: {
                studentInfo: studentInfo
            }
        })
    }

    render() {
        return(
            <div className="student-dashboard-main-container">
                {
                    this.state.loader ?
                    <div className="student-dashboard-loader">
                        <img src={Loader} alt="" />
                    </div>
                    :
                    <div className="student-dashboard-container-wrapper">
                        <div className="student-dashboard-nav row"></div>
                        <div className="student-dashboard-data col-sm-10 col-md-10 col-lg-10">
                        {
                            this.state.studentData && this.state.studentData.length !== 0 ?
                            <div className="row">
                            {Object.keys(this.state.studentData).map((value,key) => {
                                return(
                                    <div className="col-sm-12 col-md-6 col-lg-4 dashboard-margin" key={key}>
                                        <div className="student-dashboard-card" onClick={this.getTheStudentData.bind(this,this.state.studentData[value])}>
                                        <div></div>
                                        <div>Id: {value}</div>
                                        <div>Name: {this.state.studentData[value].name}</div>
                                        <div>Total Marks: {this.state.studentData[value].marks.s1 + this.state.studentData[value].marks.s2 + this.state.studentData[value].marks.s3}</div>
                                        </div>
                                    </div>
                                )
                            })}
                            </div> :
                            <div>No data yet</div>
                        }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Dashboard);