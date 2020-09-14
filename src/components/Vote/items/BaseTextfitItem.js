import React from 'react';
import { Textfit } from "react-textfit";
import cx from "classnames";

function BaseItemsTextfitItem(props) {
    const item = props.item;

    return <div
        onClick={() => props.onClick(item.id)}
        className={cx({
            item: true,
            active: item.selected,
            triggered: item.triggered
        })}
    >
        <Textfit style={{height: 60}} className="text-fit" max={16}>{item.name}</Textfit>
        {!!(item.text) && <><p className="text">{item.text}</p></>}
    </div>
}


export default BaseItemsTextfitItem;
