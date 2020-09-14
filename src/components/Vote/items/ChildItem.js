import React from 'react';

function ChildItem(props) {
    const item = props.item;

    const parent = <div
        className={item.selected ? "active item" : "item"}
        onClick={() => props.onClick(item.id)}
    >
        {item.name}
    </div>;

    const childs = item.childs.map(item =>
        <div
            key={item.id}
            className={item.selected ? "active child" : "child"}
            onClick={() => props.onClick(item.id)}
        >
            {item.name}
        </div>
    );

    return <div key={item.id} className="parent-item">
        {parent}
        {childs}
    </div>
}


export default ChildItem;
