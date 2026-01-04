import axios from "axios";

export const makeServerRequest = (
    url,
    method,
    body,
    onSuccess,
    onFailure
) => {
    axios({
        url,
        method,
        ...(body && { data: body }),
        headers: {
            Accept: "application/json"
        }
    })
        .then((res) => {
            onSuccess(res.data, res.status);
        })
        .catch((err) => {
            onFailure({
                status: err.response?.status || 0,
                message: "Network error or offline"
            });
        });

};

