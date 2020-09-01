import {APP_STAGE_CHANGE} from "../constants/actionTypes";

export default (stage) => {
    return {
        type: APP_STAGE_CHANGE,
        payload: stage
    };
}
