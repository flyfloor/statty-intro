import uuidv1 from 'uuid/v1'

export const fetchUserListService = ({ pageSize, pageNum } = { pageSize: 20, pageNum: 1 }) => {
    return new Promise(resolve => {
        setTimeout(() => resolve({
            users: [{
                id: '1',
                name: '123',
                sex: 'female',
                age: 12,
                city: {
                    brief: 'km',
                    name: 'kunming',
                }
            }]
        }), 300)
    })
}

export const deleteUserService = user => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                status: 200,
            })
        }, 300)
    })
}

export const saveUserService = user => {
    return new Promise(resolve => {
        setTimeout(() => {
            if (user.id) {
                resolve({ user })
            } else {
                user.id = uuidv1()
                resolve({ user })
            }
        }, 300)
    })
}