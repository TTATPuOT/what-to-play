import {CHOICES_SET_IDS} from "../constants/actionTypes";

/**
 * @param {number[]} ids id игр, которые нужно отобразить вместо результатов
 */
export default (ids) => {
    return {
        type: CHOICES_SET_IDS,
        payload: ids
    };
}
