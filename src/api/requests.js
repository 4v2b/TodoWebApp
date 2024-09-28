import { getToken, removeToken, storeToken } from '../utils/storageHelpers.js';

export async function authorise(name, password, isRemembered = false) {
    let success = true;
    return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, password
        })
    })
        .then(response => { if (response.ok) return response.text(); else throw new Error(response.status) })
        .then(token => { storeToken(token, isRemembered); return success; })
        .catch(() => { removeToken(); return !success });
}

export async function register(name, password) {
    return fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, password
        })
    })
        .then(async response => {
            return {
                ok: response.ok,
                message : await response.text()
            }
        })
        .catch(() => {
            return {
                ok: false,
                message: "Server error. Can't register the user"
            }
        });
}

export async function getTodos() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Todo`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            return await response.json();
        }
        else throw new Error(response.status)
    } catch (error) {
        console.error(error); return null
    }
}


export async function getTodo(listId) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/Todo/${listId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (response.ok) {
            return await response.json();
        }
        else throw new Error(response.status)
    } catch (error) {
        console.error(error); return null
    }
}

export async function putTodoList(todoList) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo/${todoList.id}`, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ...todoList
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function putTodoItem(todoItem) {

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo/items/${todoItem.id}`, {
            method: "PUT",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ...todoItem
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function postTodoItem(listId, todoItem) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo/${listId}`, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ...todoItem
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function postTodoList(todoList) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo`, {
            method: "POST",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ...todoList
            })
        });

        if (response.ok) {
            return await response.json();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}

export async function deleteTodoItem(itemId) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo/items/${itemId}`, {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });


        // todo : return true or false depending on status

        if (response.ok) {
            return await response.text();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}


export async function deleteTodoList(listId) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/todo/${listId}`, {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        });

        // todo : return true or false depending on status

        if (response.ok) {
            return await response.text();
        }
        else { console.error(response); throw new Error(response.status) }
    } catch (error) {
        console.error(error); return null
    }
}