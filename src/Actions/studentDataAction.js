import axios from "axios";
import { actionTypes } from "./actionTypes";

export function getAllStudents(dispatch) {
  return axios.get("https://api.myjson.com/bins/1dlper").then((response) => {
    dispatch({
      type: actionTypes.STUDENT_DATA,
      payload: response,
    });
  });
}

export function getParticularStudentInfo(id) {
  return function (dispatch) {
    dispatch({
      type: actionTypes.PARTICULAR_STUDENT_INFO,
      payload: id,
    });
  };
}
