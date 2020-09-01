import {CHOICES_SET} from "../constants/actionTypes";

/**
 * @param {string} type Тип выбора
 * @param {number[]} choice id выбранных вариантов
 * @return {{payload: {type: *, choice: *}, type: string}}
 */
export default (type, choice) => {
    return {
        type: CHOICES_SET,
        payload: {
            type: type,
            choice: choice
        }
    };
}
