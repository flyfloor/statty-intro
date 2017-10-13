import updateHelper from 'react-addons-update';

import {
    DELETE_USER,
    SHOW_EDIT_USER,
    SHOW_CREATE_USER,
    CREATE_OR_UPDATE_USER,
    HIDE_CREATE_USER,
    UPDATE_USER_FORM,
    FETCH_USER_LIST,
    SHOW_LOADING,
    HIDE_LOADING,
} from '../common/contentType';

const defaultUpdateUser = {
    sex: 'female',
    age: '',
    name: '',
    id: '',
    city: {
        name: 'beijing',
        brief: 'bj',
    }
}

export default (state, action) => {
    switch (action.type) {
        // delete user
        case DELETE_USER:
            if (!action.user || !action.user.id) {
                return state
            }
            return updateHelper(state, {
                users: { $set: state.users.filter(u => u.id !== action.user.id) }
            })
        // show create user form
        case SHOW_CREATE_USER:
            return updateHelper(state, {
                showCreate: { $set: true },
                updateUser: { $set: defaultUpdateUser }
            })
        // hide create user form
        case HIDE_CREATE_USER:
            return updateHelper(state, {
                showCreate: { $set: false }
            })
        // update user form field value
        case UPDATE_USER_FORM:
            let { updateUser } = state
            return updateHelper(state, {
                updateUser: { $set: action.user }
            })
        // show edit user form
        case SHOW_EDIT_USER:
            return updateHelper(state, {
                updateUser: { $set: action.user },
                showCreate: { $set: true },
            })
        // update user
        case CREATE_OR_UPDATE_USER:
            let allUserIds = state.users.map(item => item.id)
            let { user } = action
            // create
            if (allUserIds.indexOf(user.id) === -1) {
                return updateHelper(state, {
                    users: { $push: [Object.assign({}, user)] },
                    showCreate: { $set: false},
                    updateUser: { $set: Object.assign({}, defaultUpdateUser) }
                })
            }
            // update
            return updateHelper(state, {
                users: { $set: state.users.map(item => item.id === user.id ? Object.assign({}, user) : item) },
                showCreate: { $set: false},
                updateUser: { $set: Object.assign({}, defaultUpdateUser) }
            })
        // fetch user list
        case FETCH_USER_LIST:
            return updateHelper(state, {
                users: { $set: action.users }
            })
        case SHOW_LOADING:
            return updateHelper(state, {
                loading: { $set: true }
            })
        case HIDE_LOADING:
            return updateHelper(state, {
                loading: { $set: false }
            })
        default:
            return state
    }
}