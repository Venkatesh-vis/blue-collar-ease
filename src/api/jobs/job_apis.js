import {JOB_ACTION_TYPES} from "../../reducers/jobreducer.js";
import {makeServerRequest} from "../makeRequest.js";


const JOBS_API_URL =
    "https://gist.githubusercontent.com/Venkatesh-vis/56c4f61a00125fdd266e03a9887fbce4/raw/a5f7aa03cd56aea0a8ef4913446f61f6ee202ce0/works.json";

export const fetchJobs = () => (dispatch) => {
    dispatch({ type: JOB_ACTION_TYPES.FETCH_JOBS_REQUEST });

    const successCallBackFunction = (serverResponse) => {
        dispatch({
            type: JOB_ACTION_TYPES.FETCH_JOBS_SUCCESS,
            payload: serverResponse
        });
    }

    const failureCallBackFunction = (serverResponse) => {
        dispatch({
            type: JOB_ACTION_TYPES.FETCH_JOBS_FAILURE,
            payload: serverResponse.message
        });
    }

    makeServerRequest( JOBS_API_URL, "GET", null, successCallBackFunction, failureCallBackFunction);
};
