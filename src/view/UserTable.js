import React, { Component } from 'react';
import { State } from 'statty';
import userReducer from '../reducer/user';

import { 
    showCreateUser,
    showEditUser, 
    hideCreateUser,
    deleteUser, 
    fetchUserList,
    createOrUpdateUser,
    updateUserField,
    updateUserCitiesField,
} from '../action/user';

const UserTable = () => (
    <State
        select={
            state => ({ 
                loading: state.loading,
                users: state.users, 
                showCreate: state.showCreate, 
                updateUser: state.updateUser 
            })
        }
        render={(state, update) => (
            <article>
                <section>
                    <button onClick={() => update(showCreateUser())}>add</button>
                </section>
                <UserListTable {...state} update={update}/>      
                <UserForm {...state} update={update} />
            </article>
        )}
    />
)

class UserListTable extends Component {
    componentDidMount() {
        fetchUserList(this.props.update, {})
    }

    async onDeleteUser(user) {
        deleteUser(this.props.update, user)
    }

    render() {
        const { users, loading, update } = this.props
        return (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>age</th>
                        <th>sex</th>
                        <th>city</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    { loading ? 
                        <tr>
                            <td colSpan={5}>
                                loading....
                            </td>
                        </tr>
                        : users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.sex}</td>
                                <td>{user.city.brief}-{user.city.name}</td>
                                <td>
                                    <button onClick={() => update(showEditUser(user))}>edit</button>
                                    <button onClick={() => this.onDeleteUser(user)}>delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }
}


class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    async handleSubmit(e) {
        e.preventDefault()
        createOrUpdateUser(this.props.update, this.props.updateUser)
    }

    render() {
        const { showCreate, updateUser, update } = this.props
        return (
            showCreate ? 
                <form onSubmit={this.handleSubmit}>
                    <h3>Create a user</h3>
                    <div>
                        <label htmlFor="name">name: </label>                                
                        <input 
                            type="text" 
                            name="name" 
                            value={updateUser.name}
                            onChange={(e) => update(updateUserField(updateUser, 'name', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">age: </label>                                
                        <input 
                            type="number" 
                            name="age" 
                            value={updateUser.age}
                            onChange={(e) => update(updateUserField(updateUser, 'age', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="city_name">city name: </label>                                
                        <input 
                            type="text" 
                            name="city_name" 
                            value={updateUser.city.name}
                            onChange={(e) => update(updateUserCitiesField(updateUser, 'name', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="city_brief">city brief: </label>                                
                        <input 
                            type="text" 
                            name="city_brief" 
                            value={updateUser.city.brief}
                            onChange={(e) => update(updateUserCitiesField(updateUser, 'brief', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="sex">sex: </label>
                        <select
                            value={updateUser.sex}
                            onChange={(e) => update(updateUserField(updateUser, 'sex', e.target.value))}
                        >
                            <option value="female">female</option>
                            <option value="male">male</option>
                        </select>
                    </div>
                    <div>
                        <input 
                            type="submit" 
                            value={updateUser.id ? 'edit' : 'create'}
                        />
                        <button onClick={() => update(hideCreateUser())}>cancel</button>
                    </div>
                </form>
                : null
        );
    }
}

export default UserTable
