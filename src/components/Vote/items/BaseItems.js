import React from 'react';

function baseItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item" : "item"}
            onClick={() => props.toggleSelected(index)}
        >
            {item.name}
        </div>
    )
}


export default baseItems;
