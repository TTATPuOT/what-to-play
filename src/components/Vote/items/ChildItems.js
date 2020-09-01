import React from 'react';

function ChildItems (props) {
    const newArray = [];
    for (const [index, item] of props.items.entries()) {
        item.index = index;

        if (item.parent) {
            const index = newArray.findIndex(i => i.id === item.parent);
            if (index >= 0) {
                newArray[index].childs.push(item);
                continue;
            }
        }

        item.childs = [];
        newArray.push(item);
    }

    return newArray.map(item => {
        const parent = <div
            className={item.selected ? "active item" : "item"}
            onClick={() => props.toggleSelected(item.index)}
        >
            {item.name}
        </div>;

        const childs = item.childs
            ? item.childs.map(item =>
                <div
                    className={item.selected ? "active child" : "child"}
                    onClick={() => props.toggleSelected(item.index)}
                >
                    {item.name}
                </div>
            )
            : null;

        return <div key={item.id} className="parent-item">
            {parent}
            {childs}
        </div>
    });
}


export default ChildItems;
