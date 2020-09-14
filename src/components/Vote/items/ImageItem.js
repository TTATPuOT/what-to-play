import React from 'react';

function ImageItem (props) {
    const item = props.item;

    return <div
        className={item.selected ? "active item-img" : "item-img"}
        onClick={() => props.onClick(item.id)}
    >
        {!!(item.image) && <img src={item.image} alt={item.name} />}
        {item.name}
        {!!(item.text) && <><p className="text">{item.text}</p></>}
    </div>
}


export default ImageItem;
