import React from 'react';

function TwoItem (props) {
    const item = props.item;

    return <div
        className={item.selected ? "active item-two" : "item-two"}
        onClick={() => props.onClick(item.id)}
    >
        <span style={{color: `#${item.color}`}}>
            {item.name}
        </span>
    </div>
}


export default TwoItem;
