import React from 'react';

import "./Start.sass";

class Start extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className="start">
                <h1>Здравствуйте!</h1>
                <div className="cards">
                    <div className="card">
                        <h4>Отвечайте на вопросы</h4>
                        <p>Мы зададим Вам 10 вопросов о игровых предпочтениях</p>
                    </div>
                    <div className="card">
                        <h4>Меняйте ответы</h4>
                        <p>Если Вам не нравятся ответы, вы можете их обновить</p>
                    </div>
                    <div className="card">
                        <h4>Получите список игр</h4>
                        <p>Исходя из ваших ответов, мы выберем для вас несколько игр</p>
                    </div>
                </div>

                <button>Начать!</button>
            </section>
        )
    }
}


export default Start;
