import React from 'react';
import {connect} from "react-redux";
import stageTypes from "../../constants/stageTypes";
import Loader from "../Loader";
import BaseItems from "./items/BaseItems";
import ChildItems from "./items/ChildItems";
import choicesSet from "../../actions/choicesSet";
import BigItems from "./items/BigItems";
import TwoItems from "./items/TwoItems";
import ImageItems from "./items/ImageItems";
import BaseTextfitItems from "./items/BaseTextfitItems";

import "./Vote.sass";
import ym from "react-yandex-metrika";

class Vote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            offset: 0,
            limit: 6,
            loading: true,
            stage: {}
        };

        this.toggleSelected = this.toggleSelected.bind(this);
        this.getOther = this.getOther.bind(this);
        this.choicesSet = this.choicesSet.bind(this);
        this.skipStage = this.skipStage.bind(this);
    }

    componentDidMount() {
        this.updateStage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.app.stage !== prevProps.app.stage) this.updateStage();
    }

    updateStage() {
        const stage = stageTypes[this.props.app.stage];
        if (stage) return this.setState({ stage }, this.updateItems);
    }

    updateItems() {
        this.state.stage.data(this.state.limit, this.state.offset)
            .then(data => this.setState({ items: data, loading: false }));
    }

    toggleSelected(index) {
        const items = this.state.items;
        items[index].selected = !items[index].selected;
        return this.setState({ items });
    }

    getOther() {
        ym('reachGoal', "vote_other_" + this.state.stage.type, {
            changed: this.state.items.map(i => i.name)
        });

        this.setState({
            items: [],
            offset: this.state.offset + this.state.limit,
            loading: true,
        }, this.updateItems);
    }

    choicesSet() {
        const selectedItems = this.state.items.filter(i => i.selected);

        ym('reachGoal', "vote_" + this.state.stage.type, {
            selected: selectedItems.map(i => i.name)
        });

        this.setState({ items: [], loading: true, offset: 0 });
        return this.props.choicesSet(this.state.stage.type, selectedItems.map(i => i.id));
    }

    skipStage() {
        ym('reachGoal', "vote_skip_" + this.state.stage.type, {});

        this.setState({ items: [], loading: true, offset: 0 });
        return this.props.choicesSet(this.state.stage.type, []);
    }

    render() {
        const TagNameTypes = { base: BaseItems, baseTextfit: BaseTextfitItems, child: ChildItems, big: BigItems, two: TwoItems, image: ImageItems };
        const TagName = TagNameTypes[this.state.stage.component];
        const variants = this.state.loading || !TagName
            ? <Loader />
            : <TagName items={this.state.items} toggleSelected={this.toggleSelected} />;

        const selected = this.state.items.findIndex(item => item.selected);

        return (
            <section className="vote">
                <div className="question">
                    <h2>{this.state.stage.question}</h2>
                    <div className="variants">{variants}</div>
                    <div className="bottom">
                        <div>
                            <button disabled={this.state.loading} className="other" onClick={this.getOther}>
                                {this.state.stage.change ? "Give me other options for answer" : ""}
                            </button>
                            {this.state.stage.change && "or"}
                            <button disabled={this.state.loading} className="other" onClick={this.skipStage}>
                                Just skip this question
                            </button>
                        </div>
                        <button
                            className="next"
                            disabled={selected === -1 || this.state.loading}
                            onClick={this.choicesSet}
                        >
                            Next question
                        </button>
                    </div>
                </div>
            </section>
        )
    }
}


export default connect(
    state => ({
        app: state.app
    }),
    dispatch => ({
        choicesSet: (type, choice) => dispatch(choicesSet(type, choice))
    })
)(Vote);
