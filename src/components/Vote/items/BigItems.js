import React from 'react';

function BigItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item-big" : "item-big"}
            onClick={() => props.toggleSelected(index)}
        >
            <span style={{color: `#${item.color}`}}>
                {item.name}
            </span>
        </div>
    )
}


export default BigItems;
