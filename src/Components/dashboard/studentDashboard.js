import React from "react";
import "./studentDashboard.css";
import { getAllStudents } from "../../Actions/studentDataAction";
import { connect } from "react-redux";
import Loader from "../../images/Loader.svg";
import Student from "../../images/student.png";
import NotFound from "../../images/oops.jpg";
const mapStateToProps = (store) => {
  return {
    studentData: store.student.studentData,
  };
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      studentData: {},
      loader: true,
      sort: true,
      sort2: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudents);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.studentData && nextProps.studentData.length !== 0) {
      this.setState(
        {
          loader: false,
          studentData: nextProps.studentData.data,
        },
        () => {
          window.history.pushState(null, document.title, window.location.href);
          window.addEventListener("popstate", function (event) {
            window.history.pushState(
              null,
              document.title,
              window.location.href
            );
          });
        }
      );
    }
  }

  getTheStudentData(values) {
    var studentInfo = Object.assign({}, values);
    var rollNo = studentInfo[rollNo];
    this.props.history.push({
      pathname: `/dashboard/${studentInfo.rollNo}`,
      state: {
        studentInfo: studentInfo,
      },
    });
  }

  searchStudent = (e) => {
    var input = e.target.value.toUpperCase();
    this.setState(
      {
        studentData: this.props.studentData.data,
      },
      () => {
        var res = Object.keys(this.state.studentData)
          .filter(
            (items) =>
              this.state.studentData[items].name.toUpperCase().indexOf(input) >
              -1
          )
          .reduce(
            (res, key) =>
              Object.assign(res, { [key]: this.state.studentData[key] }),
            {}
          );
        this.setState({
          studentData: res,
        });
        if (input === "") {
          this.setState({
            studentData: this.props.studentData.data,
          });
        }
      }
    );
  };

  alphabetically = () => {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var res = Object.values(list).sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      this.setState({
        studentData: res,
        sort: false,
      });
    }
  };

  reverseAlphabetically = () => {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var res = Object.values(list).sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });

      this.setState({
        studentData: res,
        sort: true,
      });
    }
  };

  increasingOrder = () => {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var res = Object.values(list).sort(function (a, b) {
        if (
          a.marks.s1 + a.marks.s2 + a.marks.s3 <
          b.marks.s1 + b.marks.s2 + b.marks.s3
        ) {
          return -1;
        }
        if (
          a.marks.s1 + a.marks.s2 + a.marks.s3 >
          b.marks.s1 + b.marks.s2 + b.marks.s3
        ) {
          return 1;
        }
        return 0;
      });

      this.setState({
        studentData: res,
        sort2: false,
      });
    }
  };

  decreasingOrder = () => {
    if (
      Object.keys(this.state.studentData) &&
      Object.keys(this.state.studentData).length !== 0
    ) {
      var list = Object.assign({}, this.state.studentData);
      var res = Object.values(list).sort(function (a, b) {
        if (
          a.marks.s1 + a.marks.s2 + a.marks.s3 >
          b.marks.s1 + b.marks.s2 + b.marks.s3
        ) {
          return -1;
        }
        if (
          a.marks.s1 + a.marks.s2 + a.marks.s3 <
          b.marks.s1 + b.marks.s2 + b.marks.s3
        ) {
          return 1;
        }
        return 0;
      });

      this.setState({
        studentData: res,
        sort2: true,
      });
    }
  };

  render() {
    return (
      <div className="student-dashboard-main-container">
        {this.state.loader ? (
          <div className="student-dashboard-loader">
            <img src={Loader} alt="Loader" />
          </div>
        ) : (
          <div className="student-dashboard-container-wrapper">
            <div className="student-dashboard-nav row">
              <div className="col-sm-12 col-md-12 col-lg-12 student-dashboard-nav-wrapper">
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <input
                    placeholder="Search students by name"
                    onChange={this.searchStudent}
                    className="search-student"
                  ></input>
                </div>
                <div className="col-md-4 col-lg-4 btn">
                  <button
                    className="btn-sort"
                    onClick={
                      this.state.sort
                        ? this.alphabetically
                        : this.reverseAlphabetically
                    }
                  >
                    {this.state.sort ? "A-Z" : "Z-A"}
                  </button>
                  <button
                    className="btn-sort2"
                    onClick={
                      this.state.sort2
                        ? this.increasingOrder
                        : this.decreasingOrder
                    }
                  >
                    {this.state.sort2 ? "Increasing Order" : "Decreasing Order"}
                  </button>
                </div>
              </div>
            </div>
            <div className="student-dashboard-data col-sm-10 col-md-10 col-lg-10">
              {Object.keys(this.state.studentData) &&
              Object.keys(this.state.studentData).length !== 0 ? (
                <div className="row" style={{ paddingTop: "60px" }}>
                  {Object.keys(this.state.studentData).map((value, key) => {
                    return (
                      <div
                        className="col-sm-12 col-md-6 col-lg-4 dashboard-margin"
                        key={key}
                      >
                        <div
                          className="student-dashboard-card"
                          onClick={this.getTheStudentData.bind(
                            this,
                            this.state.studentData[value]
                          )}
                        >
                          <div style={{ width: "100px", margin: "auto" }}>
                            <img src={Student} alt="" width="100%" />
                          </div>
                          <div>Id: {this.state.studentData[value].rollNo}</div>
                          <div>Name: {this.state.studentData[value].name}</div>
                          <div>
                            Total Marks:{" "}
                            {this.state.studentData[value].marks.s1 +
                              this.state.studentData[value].marks.s2 +
                              this.state.studentData[value].marks.s3}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="not-found">
                  <div>
                    <img src={NotFound} alt="" width="100%" />
                  </div>
                  <div>Oops...that student is not available</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
