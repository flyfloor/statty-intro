import updateHelper from 'react-addons-update';

import userReducer from '../reducer/user';
import { 
    SHOW_CREATE_USER,
    SHOW_EDIT_USER,
    DELETE_USER,
    HIDE_CREATE_USER, 
    CREATE_OR_UPDATE_USER,
    UPDATE_USER_FORM,
    FETCH_USER_LIST, 
    SHOW_LOADING,
    HIDE_LOADING,
} from '../common/contentType';

import {
    fetchUserListService,
    saveUserService,
    deleteUserService,
} from '../service/user';

// show create user form
export const showCreateUser = () => state => userReducer(state, { type: SHOW_CREATE_USER })
// show edit user form
export const showEditUser = user => state => userReducer(state, { type: SHOW_EDIT_USER, user })
// hide create user form
export const hideCreateUser = user => state => userReducer(state, { type: HIDE_CREATE_USER })
// delete a user
export const deleteUser = (update, user) => {
    deleteUserService(user).then(res => {
        update(state => userReducer(state, { type: DELETE_USER, user }))
    })
}

export const showLoading = () => state => userReducer(state, { type: SHOW_LOADING })
export const hideLoading = () => state => userReducer(state, { type: HIDE_LOADING })

// update user field
export const updateUserField = (user, field, value) => state => {
    const newUser = updateHelper(user, {
        [field]: { $set: value }
    })
    return userReducer(state, { type: UPDATE_USER_FORM, user: newUser })
}
// update user field
export const updateUserCitiesField = (user, field, value) => state => {
    const newUser = updateHelper(user, {
        city: { [field]: { $set: value } }
    })
    return userReducer(state, { type: UPDATE_USER_FORM, user: newUser })
}
// fetch user list
export const fetchUserList = (update, params) => { 
    fetchUserListService(params).then(res => {
        update(state => userReducer(state, { type: FETCH_USER_LIST, users: res.users }))
    })
}
// create or update user
export const createOrUpdateUser = (update, user) => {
    saveUserService(user).then(res => {
        update(state => userReducer(state, { type: CREATE_OR_UPDATE_USER, user }))
    })
}
