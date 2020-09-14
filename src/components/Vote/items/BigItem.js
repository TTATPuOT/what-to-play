import React from 'react';

function BigItem (props) {
    const item = props.item;

    return <div
        className={item.selected ? "active item-big" : "item-big"}
        onClick={() => props.onClick(item.id)}
    >
        <span style={{color: `#${item.color}`}}>
            {item.name}
        </span>
    </div>
}


export default BigItem;
