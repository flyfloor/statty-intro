import updateHelper from 'react-addons-update';

import userReducer from '../reducer/user';
import { 
    SHOW_CREATE_USER,
    SHOW_EDIT_USER,
    DELETE_USER,
    HIDE_CREATE_USER, 
    CREATE_USER, 
    UPDATE_USER, 
    UPDATE_USER_FORM,
    FETCH_USER_LIST, 
} from '../common/contentType';

// show create user form
export const showCreateUser = () => state => userReducer(state, { type: SHOW_CREATE_USER })
// show edit user form
export const showEditUser = user => state => userReducer(state, { type: SHOW_EDIT_USER, user })
// hide create user form
export const hideCreateUser = user => state => userReducer(state, { type: HIDE_CREATE_USER })
// delete a user
export const deleteUser = user => state => userReducer(state, { type: DELETE_USER, user })

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
        city: {
            [field]: { $set: value }
        }
    })
    return userReducer(state, { type: UPDATE_USER_FORM, user: newUser })
}
// fetch user list
export const fetchUserList = (update, { pageNum, pageSize } = { pageNum: 1, pageSize: 20 }) => {
    setTimeout(() => {
        const users = [{
            id: '1',
            name: '123',
            sex: 'female',
            age: 12,
            city: {
                brief: 'km',
                name: 'kunming',
            }
        }]
        update(state => userReducer(state, { type: FETCH_USER_LIST, users }))
    }, 1000)
    return 
}
// save update user
export const saveUpdateUser = (update, user) => {
    setTimeout(() => {
        if (user.id) {
            update(state => userReducer(state, { type: UPDATE_USER, user }))
            return
        }
        update(state => userReducer(state, { type: CREATE_USER, user }))
    }, 500)
}