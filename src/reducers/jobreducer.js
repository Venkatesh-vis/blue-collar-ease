export const JOB_ACTION_TYPES = {
    FETCH_JOBS_REQUEST: "FETCH_JOBS_REQUEST",
    FETCH_JOBS_SUCCESS: "FETCH_JOBS_SUCCESS",
    FETCH_JOBS_FAILURE: "FETCH_JOBS_FAILURE"
};


const initialState = {
    jobs: [],
    loading: false,
    error: null
};

export default function jobsReducer(state = initialState, action) {
    switch (action.type) {
        case JOB_ACTION_TYPES.FETCH_JOBS_REQUEST:
            return { ...state, loading: true };

        case JOB_ACTION_TYPES.FETCH_JOBS_SUCCESS:
            return { ...state, loading: false, jobs: action.payload };

        case JOB_ACTION_TYPES.FETCH_JOBS_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
