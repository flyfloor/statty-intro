import React, { Component } from 'react';
import { State } from 'statty';
import userReducer from '../reducer/user';
import { 
    DELETE_USER, 
    SHOW_CREATE_USER, 
    HIDE_CREATE_USER, 
    CREATE_USER, 
    UPDATE_USER, 
    SHOW_EDIT_USER,
    UPDATE_USER_FORM 
} from '../common/contentType';

const dispatchUser = action => state => userReducer(state, action)

const updateUserField = (field, value) => dispatchUser({ type: UPDATE_USER_FORM, user: { [field]: value } })

const UserTable = () => (
    <State
        select={state => ({ users: state.users, showCreate: state.showCreate, updateUser: state.updateUser })}
        render={({ users, showCreate, updateUser }, update) => (
            <article>
                <section>
                    <button onClick={() => update(dispatchUser({ type: SHOW_CREATE_USER }))}>add</button>
                </section>
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>age</th>
                            <th>sex</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.sex}</td>
                                    <td>
                                        <button onClick={() => update(dispatchUser({ type: SHOW_EDIT_USER, user }))}>edit</button>
                                        <button onClick={() => update(dispatchUser({ type: DELETE_USER, user }))}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <UserForm update={update} showCreate={showCreate} updateUser={updateUser}/>
            </article>
        )}
    />
)

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.update(dispatchUser({ type: this.props.updateUser.id ? UPDATE_USER : CREATE_USER }))
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
                            onChange={(e) => update(updateUserField('name', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">age: </label>                                
                        <input 
                            type="number" 
                            name="age" 
                            value={updateUser.age}
                            onChange={(e) => update(updateUserField('age', e.target.value))}
                        />
                    </div>
                    <div>
                        <label htmlFor="sex">sex: </label>
                        <select
                            value={updateUser.sex}
                            onChange={(e) => update(updateUserField('sex', e.target.value))}
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
                        <button onClick={() => update(dispatchUser({ type: HIDE_CREATE_USER }))}>cancel</button>
                    </div>
                </form>
                : null
        );
    }
}

export default UserTable
