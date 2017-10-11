import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'statty';
import inspect from 'statty/inspect';
import Counter from './view/Counter';
import UserTable from './view/UserTable';
import userStore from './store/user'
import counterStore from './store/counter'

export class App extends Component {
    render() {
        return (
            <div>
                <h3>store 1</h3>
                <Provider state={userStore} inspect={inspect}>
                    <UserTable/>
                </Provider>
                <br/>
                <h3>store 2</h3>
                <Provider state={counterStore} inspect={inspect}>
                    <Counter/>
                </Provider>
            </div>
        );
    }
}
ReactDOM.render(<App/>, document.getElementById('root'))