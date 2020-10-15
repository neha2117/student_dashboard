import React from "react";
import { connect } from "react-redux";
import {
  getParticularStudentInfo,
  getAllStudents,
} from "../../Actions/studentDataAction";
import Loader from "../../images/Loader.svg";
import HatIcon from "../../images/hat_icon.png";
import "./studentInfo.css";

const mapStateToProps = (store) => {
  return {
    studentInfo: store.student.particularStudentInfo,
    studentData: store.student.studentData,
  };
};
class StudentData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentInfo: {},
      studentData: {},
      loader: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudents);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData && nextProps.studentData.length !== 0) {
      this.setState(
        {
          studentData: nextProps.studentData.data,
        },
        () => {
          var loc = window.location.pathname.split("/");
          if (loc && loc.length === 3) {
            var index = parseInt(loc[2]);
            if (this.state.studentData[index] !== undefined) {
              this.setState(
                {
                  studentInfo: this.state.studentData[index],
                  loader: false,
                },
                () => {
                  console.log("data", this.state.studentInfo);
                }
              );
            } else {
              this.setState({
                loader: false,
                studentInfo: {},
              });
            }
          }
        }
      );
    }
  }

  render() {
    return (
      <div className="student-dashboard-main-container">
        {this.state.loader ? (
          <div className="student-dashboard-loader">
            <img src={Loader} alt="" />
          </div>
        ) : (
          <div className="student-info-wrapper">
            <div className="student-info-header">STUDENT DETAILS</div>
            <div className="student-info-detail-container">
              <div className="row" style={{ height: "100%", width: "100%" }}>
                {Object.keys(this.state.studentInfo) &&
                Object.keys(this.state.studentInfo).length !== 0 ? (
                  <div className="student-info-container col-sm-12 col-md-12 col-lg-12">
                    <div className="col-sm-12 col-md-5 col-lg-5 left">
                      <div className="student-info-hat-icon">
                        <img src={HatIcon} alt="" width="70px" />
                      </div>
                      <div className="student-info-name">
                        Name: {this.state.studentInfo.name}{" "}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-5 col-lg-5 right">
                      <div className="student-info-details">
                        Roll No: {this.state.studentInfo.rollNo}
                      </div>

                      <div className="student-info-details">
                        Class: {this.state.studentInfo.class}
                      </div>
                      <div className="student-info-details">
                        Marks:{" "}
                        {this.state.studentInfo.marks.s1 +
                          this.state.studentInfo.marks.s2 +
                          this.state.studentInfo.marks.s3}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-student">No student found!!!</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(StudentData);
