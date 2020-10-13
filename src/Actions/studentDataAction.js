import axios from "axios";
import { actionTypes } from "./actionTypes";

export function getAllStudents(dispatch) {
  try {
    return axios.get("https://api.myjson.com/bins/1dlper").then((response) => {
      dispatch({
        type: actionTypes.STUDENT_DATA,
        payload: response,
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export function getParticularStudentInfo(id) {
  try {
    return function (dispatch) {
      dispatch({
        type: actionTypes.PARTICULAR_STUDENT_INFO,
        payload: id,
      });
    };
  } catch (e) {
    console.log(e);
  }
}
