import React from 'react';
import { Textfit } from "react-textfit";

function baseItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item" : "item"}
            onClick={() => props.toggleSelected(index)}
        >
            <Textfit style={{height: 60}} class="text-fit" max={16}>{item.name}</Textfit>
            {!!(item.text) && <><p className="text">{item.text}</p></>}
        </div>
    )
}


export default baseItems;
