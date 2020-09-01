import React from 'react';

function TwoItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item-two" : "item-two"}
            onClick={() => props.toggleSelected(index)}
        >
            <span style={{color: `#${item.color}`}}>
                {item.name}
            </span>
        </div>
    )
}


export default TwoItems;
