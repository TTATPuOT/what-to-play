import React from 'react';

function ImageItems (props) {
    return props.items.map((item, index) =>
        <div
            key={item.id}
            className={item.selected ? "active item-img" : "item-img"}
            onClick={() => props.toggleSelected(index)}
        >
            {!!(item.image) && <img src={item.image} alt={item.name} />}
            {item.name}
            {!!(item.text) && <><p className="text">{item.text}</p></>}
        </div>
    )
}


export default ImageItems;
