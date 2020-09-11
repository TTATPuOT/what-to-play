import React from 'react';
import { Textfit } from "react-textfit";
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
            <Textfit style={{height: 60}} class="text-fit" max={16}>{item.name}</Textfit>
            {!!(item.text) && <><p className="text">{item.text}</p></>}
        </div>
    )
}


export default baseItems;
