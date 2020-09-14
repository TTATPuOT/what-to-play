import React from 'react';
import {connect} from "react-redux";
import stageTypes from "../../constants/stageTypes";
import Loader from "../Loader";
import BaseItem from "./items/BaseItem";
import ChildItem from "./items/ChildItem";
import choicesSet from "../../actions/choicesSet";
import BigItem from "./items/BigItem";
import TwoItem from "./items/TwoItem";
import ImageItem from "./items/ImageItem";
import BaseTextfitItem from "./items/BaseTextfitItem";
import cx from "classnames";
import ym from "react-yandex-metrika";
import TransitionGroup from "react-transition-group/cjs/TransitionGroup";
import CSSTransition from "react-transition-group/cjs/CSSTransition";

import "./Vote.sass";

class Vote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            offset: 0,
            limit: 5,
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

    toggleSelected(id) {
        const items = this.state.items.map(i => {
            if (id === i.id) i.selected = !i.selected;
            i.triggered = false;
            i.childs = !i.childs ? [] : i.childs.map(c => {
                if (id === c.id) c.selected = !c.selected;
                c.triggered = false;
                return c;
            });
            return i;
        });

        const selectedItems = items.filter(item => item.selected).length;
        if (selectedItems === 1) items[this.getRandomIndex(items)].triggered = true;

        return this.setState({ items });
    }

    getRandomIndex(array) {
        const index = Math.floor(Math.random() * array.length);
        const i = array[index];
        if (i.selected) return this.getRandomIndex(array);
        else return [index];
    }


    getOther() {
        ym('reachGoal', "vote_other", {
            voteOther: {
                [this.state.stage.type]: this.state.items.map(i => i.name)
            }
        });

        this.setState({
            items: [],
            offset: this.state.offset + this.state.limit,
            loading: true
        }, this.updateItems);
    }

    choicesSet() {
        const selectedItems = this.state.items.map(i => [i, i.childs])
            .flat(1)
            .filter(i => i)
            .filter(i => i.selected);

        ym('reachGoal', "vote", {
            vote: {
                [this.state.stage.type]: selectedItems.map(i => i.name)
            }
        });

        this.setState({ items: [], loading: true, offset: 0 });
        return this.props.choicesSet(this.state.stage.type, selectedItems.map(i => i.id));
    }

    skipStage() {
        ym('reachGoal', "vote_skip", {
            voteSkip: this.state.stage.type
        });

        this.setState({ items: [], loading: true, offset: 0 });
        return this.props.choicesSet(this.state.stage.type, []);
    }

    render() {
        const state = this.state;
        const { stage } = state;

        const TagNameTypes = {
            base: BaseItem,
            baseTextfit: BaseTextfitItem,
            child: ChildItem,
            big: BigItem,
            two: TwoItem,
            image: ImageItem
        };
        const TagName = TagNameTypes[stage.component];

        let variants = state.items.map((item, index) =>
            <CSSTransition key={item.id} timeout={50 * index} classNames="item">
                <TagName item={item} onClick={this.toggleSelected} />
            </CSSTransition>
        );

        const selected = state.items.findIndex(i => i.selected) === -1;

        return (
            <section className="vote">
                <div className="question">
                    <h2>{stage.question}</h2>
                    {stage.change &&
                    <button disabled={state.loading} className="refresh" onClick={this.getOther} />
                    }
                    {state.loading && <Loader />}
                    <TransitionGroup
                        className="variants"
                        exit={false}
                        //childFactory={childFactory}
                    >
                        {variants}
                    </TransitionGroup>
                    <div className="bottom">
                        <button
                            className={cx({
                                next: true,
                                skip: selected
                            })}
                            onClick={selected ? this.skipStage : this.choicesSet}
                            disabled={state.loading}
                        >
                            {selected ? "Skip" : "Next"} question
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
