import React from 'react';

import Loader from "../Loader";

import "./Vote.sass";

class Vote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [
                { name: "Шутеры", selected: false },
                { name: "Стратегии", selected: false },
                { name: "Ролевые", selected: false },
                { name: "ММО", selected: false },
                { name: "Гонки", selected: false },
            ],
            loading: false
        };

        this.toggleSelected = this.toggleSelected.bind(this);
    }

    toggleSelected(index) {
        const items = this.state.items;
        items[index].selected = !items[index].selected;
        return this.setState({ items });
    }

    render() {
        const variants = this.state.loading
            ? <Loader />
            : this.state.items.map((item, index) =>
                <div
                    className={item.selected ? "active item" : "item"}
                    onClick={() => this.toggleSelected(index)}
                >
                    {item.name}
                </div>
            );

        const selected = this.state.items.findIndex(item => item.selected);

        return (
            <section className="vote">
                <div className="question">
                    <h2>В какой жанр хотите поиграть?</h2>
                    <div className="variants">{variants}</div>
                    <div className="bottom">
                        <div className="other">Ничего из этого мне не подходит...</div>
                        <button disabled={selected === -1}>Следующий вопрос</button>
                    </div>
                </div>
            </section>
        )
    }
}


export default Vote;
