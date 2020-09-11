import React from 'react';
import cx from "classnames";

function baseItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={cx({
                item: true,
                active: item.selected,
                triggered: item.triggered
            })}
            onClick={() => props.toggleSelected(index)}
        >
            {item.name}
            {!!(item.text) && <><p className="text">{item.text}</p></>}
        </div>
    )
}


export default baseItems;
