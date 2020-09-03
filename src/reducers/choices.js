import {CHOICES_SET} from "../constants/actionTypes";
import stageTypes from "../constants/stageTypes";

let initialState = {};
for (const stage of stageTypes) {
    if (stage) initialState[stage.type] = [-1];
}

export default (state = initialState, action) => {

    if (action.type === CHOICES_SET) {
        return Object.assign({}, state, {
            [action.payload.type]: action.payload.choice
        });
    }

    return state;
}
