import React from 'react';
import cx from "classnames";

function BaseItem (props) {
    const item = props.item;

    return <div
        className={cx({
            item: true,
            active: item.selected,
            triggered: item.triggered
        })}
        onClick={() => props.onClick(item.id)}
    >
        {item.name}
        {!!(item.text) && <><p className="text">{item.text}</p></>}
    </div>
}


export default BaseItem;
