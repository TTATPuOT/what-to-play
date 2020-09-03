import {APP_STAGE_CHANGE, CHOICES_SET} from "../constants/actionTypes";

const initialState = { stage: 0 };

export default (state = initialState, action) => {

    if (action.type === APP_STAGE_CHANGE) {
        return Object.assign({}, state, {
            stage: action.payload
        });
    } else if (action.type === CHOICES_SET) {
        return Object.assign({}, state, {
            stage: state.stage + 1
        });
    }

    return state;
}
