import React, { Component } from 'react';
import { State } from 'statty';
import counterReducer from '../reducer/counter'
import { DECREASE_COUNT, INCREASE_COUNT } from '../common/contentType';

const dispatch = action => state => counterReducer(state, action)

const Counter = () => (
    <State
        select={state => ({ count: state.count })}
        render={({ count }, update) => (
            <div>
                <span>Clicked: {count} times</span>
                <button onClick={() => update(dispatch({ type: DECREASE_COUNT }))}>-</button>
                <button onClick={() => update(dispatch({ type: INCREASE_COUNT }))}>+</button>
            </div>
        )}
    />
)

export default Counter