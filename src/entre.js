import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'statty';
import inspect from 'statty/inspect';
import Counter from './view/Counter';
import UserTable from './view/UserTable';
import userStore from './store/user'

export class App extends Component {
    render() {
        return (
            <Provider state={userStore} inspect={inspect}>
                <UserTable/>
            </Provider>
        );
    }
}
ReactDOM.render(<App/>, document.getElementById('root'))