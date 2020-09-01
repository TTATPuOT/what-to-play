import React from 'react';

function baseItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item" : "item"}
            onClick={() => props.toggleSelected(index)}
        >
            {item.name}
            {!!(item.text) && <><p className="text">{item.text}</p></>}
        </div>
    )
}


export default baseItems;
