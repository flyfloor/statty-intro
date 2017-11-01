import React, { Component } from 'react';
import { State } from 'statty';
import counterReducer from '../reducer/counter'
import { DECREASE_COUNT, INCREASE_COUNT } from '../common/contentType';

const dispatch = action => state => counterReducer(state, action)

const Counter = () => (
    <State
        select={state => ({ count: state.count })}
        render={(state, update) => (
            <CounterComponent {...state} update={update} />
        )}
    />
)

class CounterComponent extends Component {
    componentDidMount() {
        this.props.update(dispatch({ type: INCREASE_COUNT }))
    }
    render() {
        const { count, update } = this.props
        return (
            <div>
                <span>Clicked: {count} times</span>
                <button onClick={() => update(dispatch({ type: DECREASE_COUNT }))}>-</button>
                <button onClick={() => update(dispatch({ type: INCREASE_COUNT }))}>+</button>
            </div>
        );
    }
}


export default Counter